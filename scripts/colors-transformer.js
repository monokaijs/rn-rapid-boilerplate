const fs = require('fs');
const path = require('path');
const defaultTransformer = require('metro-react-native-babel-transformer');
const { buildColorsCss } = require('./colors-to-css');

const SINGLETON = Symbol.for('colors-css:singleton');
const state = globalThis[SINGLETON] || (globalThis[SINGLETON] = {
  initialized: false,
  watching: false,
  debounceTimer: null,
  unregister: null,
});

if (!state.unregister) {
  const { register } = require('esbuild-register/dist/node');
  state.unregister = register({ target: 'es2019', format: 'cjs' });
}

const COLORS_SOURCE_ABS = path.normalize(path.resolve(__dirname, '../src/config/colors.ts'));
const OUT_CSS_ABS = path.normalize(path.resolve(__dirname, '../src/config/generated/colors.css'));

function loadColorsModule(absPath) {
  delete require.cache[absPath]; // ensure fresh read
  const mod = require(absPath);
  const obj = (mod && typeof mod === 'object' && mod.default) ? { ...mod.default, ...mod } : mod;
  return {
    AppColors: obj?.AppColors,
    AppColorsLight: obj?.AppColorsLight,
    keys: Object.keys(obj || {}),
  };
}

function buildOnce(label = 'Build') {
  try {
    const { AppColors, AppColorsLight, keys } = loadColorsModule(COLORS_SOURCE_ABS);
    if (!state.initialized) {
      console.log('[colors-css] Metro transformer loaded. pid=', process.pid);
      console.log('[colors-css] Watching file:', path.relative(process.cwd(), COLORS_SOURCE_ABS));
      console.log('[colors-css] Output file :', path.relative(process.cwd(), OUT_CSS_ABS));
    }
    console.log(`[colors-css] ${label}: exports detected: ${keys.length ? keys.join(', ') : '(none)'}`);
    if (!AppColors || !AppColorsLight) throw new Error('Missing AppColors/AppColorsLight exports');
    const { changed } = buildColorsCss(AppColorsLight, AppColors, OUT_CSS_ABS);
    console.log(`[colors-css] ${label}: ${changed ? '✅ wrote' : '✓ up-to-date'} ${path.relative(process.cwd(), OUT_CSS_ABS)}`);
  } catch (e) {
    console.warn(`[colors-css] ${label}: ❌`, e?.message || e);
  }
}

function ensureInitialized() {
  if (state.initialized) return;
  state.initialized = true;

  buildOnce('Startup');

  if (!state.watching) {
    state.watching = true;
    try {
      fs.watchFile(COLORS_SOURCE_ABS, { interval: 250 }, () => {
        clearTimeout(state.debounceTimer);
        state.debounceTimer = setTimeout(() => buildOnce('Watch'), 100);
      });
      console.log('[colors-css] File watcher active. pid=', process.pid);
    } catch (e) {
      console.warn('[colors-css] File watcher failed to start:', e?.message || e);
    }

    process.once('exit', () => {
      try { fs.unwatchFile(COLORS_SOURCE_ABS); } catch (_) {}
      try { state.unregister && state.unregister(); } catch (_) {}
    });
  }
}

function isColorsFile(f) {
  const abs = path.normalize(path.resolve(f));
  return abs === COLORS_SOURCE_ABS;
}

function maybeGenerateCssFromColors({ filename }) {
  if (!isColorsFile(filename)) return;
  const rel = path.relative(process.cwd(), filename);
  console.log(`[colors-css] transformer triggered for: ${rel}`);
  buildOnce('Metro');
}

ensureInitialized();

module.exports.transform = function (props) {
  const { filename } = props;
  maybeGenerateCssFromColors({ filename });
  return defaultTransformer.transform(props);
};
