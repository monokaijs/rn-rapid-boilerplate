#!/usr/bin/env node
/**
 * Generate colors.css from colors.ts
 * This script parses the TypeScript file as text and extracts color values
 */

const fs = require('fs');
const path = require('path');

const COLORS_SOURCE = path.resolve(__dirname, '../src/config/colors.ts');
const OUT_CSS = path.resolve(__dirname, '../src/config/generated/colors.css');

function hexToRgbTriplet(hex) {
  if (!hex) return null;
  let h = hex.trim().toLowerCase();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length !== 6) throw new Error(`Invalid hex color: ${hex}`);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function toKebab(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

function parseColorsFromTS(content) {
  const colors = {};
  
  // Match: export const AppColors = { ... }
  const appColorsMatch = content.match(/export\s+const\s+AppColors\s*=\s*\{([^}]+)\}/s);
  if (appColorsMatch) {
    const body = appColorsMatch[1];
    const colorMatches = body.matchAll(/(\w+):\s*['"]([#\w]+)['"]/g);
    colors.AppColors = {};
    for (const match of colorMatches) {
      colors.AppColors[match[1]] = match[2];
    }
  }
  
  // Match: export const AppColorsLight = { ... }
  const appColorsLightMatch = content.match(/export\s+const\s+AppColorsLight[^=]*=\s*\{([^}]+)\}/s);
  if (appColorsLightMatch) {
    const body = appColorsLightMatch[1];
    const colorMatches = body.matchAll(/(\w+):\s*['"]([#\w]+)['"]/g);
    colors.AppColorsLight = {};
    for (const match of colorMatches) {
      colors.AppColorsLight[match[1]] = match[2];
    }
  }
  
  return colors;
}

function buildBlock({title, selector, colors}) {
  const lines = Object.entries(colors).map(([k, hex]) => {
    const kebab = toKebab(k);
    const rgb = hexToRgbTriplet(hex);
    return `  --color-${kebab}: ${rgb}; /* ${hex.toLowerCase()} */`;
  });
  return `${selector} {
  /* ${title} */
${lines.join('\n')}
}`;
}

function generateCss({light, dark}) {
  const root = buildBlock({title: 'Light theme colors', selector: ':root', colors: light});
  const darkBlock = buildBlock({title: 'Dark theme colors', selector: '.dark', colors: dark});
  
  return `/* Theme-dependent color definitions */
${root}

${darkBlock}
`;
}

function writeIfChanged(filePath, content) {
  try {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing === content) return false;
  } catch (_) {
  }
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function buildColorsCss() {
  try {
    const content = fs.readFileSync(COLORS_SOURCE, 'utf8');
    const { AppColors, AppColorsLight } = parseColorsFromTS(content);
    
    if (!AppColors || !AppColorsLight) {
      throw new Error('Could not parse AppColors or AppColorsLight from colors.ts');
    }
    
    const css = generateCss({light: AppColorsLight, dark: AppColors});
    const changed = writeIfChanged(OUT_CSS, css);
    
    const rel = path.relative(process.cwd(), OUT_CSS);
    if (changed) {
      console.log(`[colors-css] ✅ Generated ${rel}`);
    } else {
      console.log(`[colors-css] ✓ Up-to-date ${rel}`);
    }
    
    return true;
  } catch (e) {
    console.error(`[colors-css] ❌ Error:`, e.message);
    return false;
  }
}

function watchColors() {
  console.log(`[colors-css] Watching ${path.relative(process.cwd(), COLORS_SOURCE)}...`);
  
  let debounceTimer = null;
  fs.watchFile(COLORS_SOURCE, { interval: 250 }, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[colors-css] File changed, regenerating...`);
      buildColorsCss();
    }, 100);
  });
  
  process.on('SIGINT', () => {
    fs.unwatchFile(COLORS_SOURCE);
    process.exit(0);
  });
}

// Main
if (require.main === module) {
  const args = process.argv.slice(2);
  const shouldWatch = args.includes('--watch') || args.includes('-w');
  
  buildColorsCss();
  
  if (shouldWatch) {
    watchColors();
  }
}

module.exports = { buildColorsCss };

