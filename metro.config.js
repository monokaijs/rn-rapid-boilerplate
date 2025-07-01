const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import("@react-native/metro-config").MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
};

module.exports = mergeConfig(
  withNativeWind(getDefaultConfig(__dirname), {
    input: "./src/config/global.css"
  }),
  config
);
