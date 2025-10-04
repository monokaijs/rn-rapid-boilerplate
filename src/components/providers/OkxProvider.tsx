import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Image, ImageSourcePropType, Text } from "react-native";

export type Pair = `${string}-${string}`;

export interface PriceInfo {
  price: number;
  ts: number;
  change7dPct?: number;
  direction7d?: "up" | "down" | "flat";
}

interface ContextValue {
  prices: Record<Pair, PriceInfo | undefined>;
  subscribe: (pair: Pair) => void;
  unsubscribe: (pair: Pair) => void;
  refresh7dChange: (pair: Pair) => Promise<void>;
  cryptoIconUrl: (symbol: string, opts?: CryptoIconOptions) => string;
  cryptoIconSource: (symbol: string, opts?: CryptoIconOptions) => ImageSourcePropType;
}

const OkxPriceContext = createContext<ContextValue | undefined>(undefined);

export interface CryptoIconOptions {
  size?: 24 | 32 | 64 | 96 | 128 | 256;
  monochrome?: boolean;
}

export function makeCryptoIconUrl(symbol: string, opts: CryptoIconOptions = {}): string {
  const s = (symbol || "").trim().toLowerCase();
  const size = opts.size ?? 64;
  const variant = opts.monochrome ? "black" : "color";
  const spotSize = size <= 32 ? 32 : 128;
  const spothq = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/${spotSize}/${variant}/${s}.png`;
  const placeholder = `https://api.dicebear.com/7.x/identicon/png?seed=${encodeURIComponent(s.toUpperCase())}`;
  return spothq || placeholder;
}

export function makeCryptoIconSource(symbol: string, opts?: CryptoIconOptions): ImageSourcePropType {
  return { uri: makeCryptoIconUrl(symbol, opts) } as const;
}

export function useCryptoIcon(symbol: string, opts?: CryptoIconOptions) {
  return useMemo(() => makeCryptoIconSource(symbol, opts), [symbol, opts?.size, opts?.monochrome]);
}

const OKX_WS = "wss://ws.okx.com:8443/ws/v5/public";
const OKX_HTTP = "https://www.okx.com";

interface PendingMsg { op: string; args?: any[] }

export const OkxPriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrices] = useState<Record<Pair, PriceInfo | undefined>>({});
  const subscribed = useRef<Set<Pair>>(new Set());
  const pending = useRef<PendingMsg[]>([]);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const send = useCallback((payload: unknown) => {
    const socket = wsRef.current;
    const data = JSON.stringify(payload);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    } else {
      pending.current.push(payload as PendingMsg);
    }
  }, []);

  const doSubscribe = useCallback((pair: Pair) => {
    send({ op: "subscribe", args: [{ channel: "tickers", instId: pair }] });
  }, [send]);

  const doUnsubscribe = useCallback((pair: Pair) => {
    send({ op: "unsubscribe", args: [{ channel: "tickers", instId: pair }] });
  }, [send]);

  const subscribe = useCallback((pair: Pair) => {
    if (!subscribed.current.has(pair)) {
      subscribed.current.add(pair);
      doSubscribe(pair);
      void refresh7dChange(pair);
    }
  }, []);

  const unsubscribe = useCallback((pair: Pair) => {
    if (subscribed.current.has(pair)) {
      subscribed.current.delete(pair);
      doUnsubscribe(pair);
      setPrices((prev) => ({ ...prev, [pair]: undefined }));
    }
  }, [doUnsubscribe]);

  const computeChange7d = (latest: number, sevenDaysClose: number) => {
    if (!isFinite(latest) || !isFinite(sevenDaysClose) || sevenDaysClose === 0) return { pct: undefined, dir: "flat" as const };
    const pct = ((latest - sevenDaysClose) / sevenDaysClose) * 100;
    const dir: "up" | "down" | "flat" = pct > 0.0001 ? "up" : pct < -0.0001 ? "down" : "flat";
    return { pct, dir };
  };

  const fetchCandles1D = useCallback(async (pair: Pair) => {
    const url = `${OKX_HTTP}/api/v5/market/candles?instId=${encodeURIComponent(pair)}&bar=1D&limit=8`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const rows: string[][] = json?.data ?? [];
    return rows;
  }, []);

  const refresh7dChange = useCallback(async (pair: Pair) => {
    try {
      const rows = await fetchCandles1D(pair);
      if (!rows || rows.length < 2) return;
      const mostRecentClose = parseFloat(rows[0]?.[4] ?? "NaN");
      const sevenAgoClose = parseFloat((rows[7] ?? rows[rows.length - 1])?.[4] ?? "NaN");
      const { pct, dir } = computeChange7d(mostRecentClose, sevenAgoClose);

      setPrices((prev) => {
        const curr = prev[pair];
        return {
          ...prev,
          [pair]: {
            price: curr?.price ?? mostRecentClose,
            ts: curr?.ts ?? Date.now(),
            change7dPct: pct,
            direction7d: dir,
          },
        };
      });
    } catch {}
  }, [fetchCandles1D]);

  const setupHeartbeat = useCallback(() => {
    cleanupHeartbeat();
    heartbeatRef.current = setInterval(() => {
      try { send({ op: "ping" }); } catch {}
    }, 20000);
  }, [send]);

  const cleanupHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }, []);

  const openSocket = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }
    const ws = new WebSocket(OKX_WS);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsOpen(true);
      setupHeartbeat();
      for (const msg of pending.current) ws.send(JSON.stringify(msg));
      pending.current = [];
      subscribed.current.forEach((p) => ws.send(JSON.stringify({ op: "subscribe", args: [{ channel: "tickers", instId: p }] })));
    };

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg?.event === "error") return;
        if (msg?.event === "subscribe" || msg?.event === "unsubscribe" || msg?.op === "pong") return;
        if (msg?.arg?.channel === "tickers" && Array.isArray(msg?.data) && msg.data[0]) {
          const { instId, last, ts } = msg.data[0];
          const pair = instId as Pair;
          const price = parseFloat(last);
          const time = Number(ts);

          setPrices((prev) => {
            const curr = prev[pair];
            return {
              ...prev,
              [pair]: {
                price,
                ts: time || Date.now(),
                change7dPct: curr?.change7dPct,
                direction7d: curr?.direction7d,
              },
            };
          });
        }
      } catch {}
    };

    ws.onclose = () => {
      setIsOpen(false);
      cleanupHeartbeat();
      if (!reconnectRef.current) {
        let attempt = 0;
        const tryReconnect = () => {
          attempt += 1;
          openSocket();
          if (!isOpen) {
            reconnectRef.current = setTimeout(tryReconnect, Math.min(30000, 1000 * 2 ** attempt));
          } else {
            if (reconnectRef.current) clearTimeout(reconnectRef.current);
            reconnectRef.current = null;
          }
        };
        reconnectRef.current = setTimeout(tryReconnect, 1500);
      }
    };

    ws.onerror = () => {};
  }, [cleanupHeartbeat, isOpen, setupHeartbeat]);

  const closeSocket = useCallback(() => {
    cleanupHeartbeat();
    if (wsRef.current) {
      try { wsRef.current.close(); } catch {}
      wsRef.current = null;
    }
  }, [cleanupHeartbeat]);

  useEffect(() => {
    openSocket();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      reconnectRef.current = null;
      closeSocket();
    };
  }, [openSocket, closeSocket]);

  const value = useMemo<ContextValue>(() => ({
    prices,
    subscribe,
    unsubscribe,
    refresh7dChange,
    cryptoIconUrl: makeCryptoIconUrl,
    cryptoIconSource: makeCryptoIconSource,
  }), [prices, subscribe, unsubscribe, refresh7dChange]);

  return <OkxPriceContext.Provider value={value}>{children}</OkxPriceContext.Provider>;
};

export function useOkxPrices() {
  const ctx = useContext(OkxPriceContext);
  if (!ctx) throw new Error("useOkxPrices must be used within <OkxPriceProvider>");
  return ctx;
}

export function usePairPrice(pair: Pair) {
  const { prices, subscribe, unsubscribe, refresh7dChange } = useOkxPrices();
  useEffect(() => {
    subscribe(pair);
    void refresh7dChange(pair);
    return () => unsubscribe(pair);
  }, [pair, subscribe, unsubscribe, refresh7dChange]);
  return prices[pair];
}

export function useBaseSymbol(pair: Pair) {
  return useMemo(() => pair.split("-")[0] ?? "", [pair]);
}

export function usePairIcon(pair: Pair, opts?: CryptoIconOptions) {
  const base = useBaseSymbol(pair);
  const { cryptoIconSource } = useOkxPrices();
  return useMemo(() => cryptoIconSource(base, opts), [base, cryptoIconSource, opts?.size, opts?.monochrome]);
}

export const PairPriceText: React.FC<{ pair: Pair; precision?: number }> = ({ pair, precision = 2 }) => {
  const info = usePairPrice(pair);
  if (!info) return <Text>—</Text>;
  return <Text>{info.price.toFixed(precision)}</Text>;
};

export const PairChange7dBadge: React.FC<{ pair: Pair; precision?: number }> = ({ pair, precision = 2 }) => {
  const info = usePairPrice(pair);
  if (!info || typeof info.change7dPct !== "number") return <Text>—</Text>;
  const sign = info.change7dPct > 0 ? "+" : "";
  const color = info.direction7d === "up" ? "#16a34a" : info.direction7d === "down" ? "#dc2626" : "#6b7280";
  return <Text style={{ color }}>{`${sign}${info.change7dPct.toFixed(precision)}%`}</Text>;
};

export const PairIconImg: React.FC<{ pair: Pair; size?: number; alt?: string; monochrome?: boolean; style?: any }> = ({ pair, size = 24, alt, monochrome, style }) => {
  const src = usePairIcon(pair, { size: (size <= 32 ? 32 : 64) as 32 | 64, monochrome });
  return <Image source={src} accessibilityLabel={alt ?? pair} style={[{ width: size, height: size, borderRadius: 6 }, style]} />;
};
