const fs = require('fs');
const path = require('path');

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

// camelCase or PascalCase -> kebab-case (neutralsForeground -> neutrals-foreground)
function toKebab(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
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
  const head = "";

  const root = buildBlock({title: 'Light theme colors', selector: ':root', colors: light});
  const darkBlock = buildBlock({title: 'Dark theme colors', selector: '.dark', colors: dark});

  return `${head}/* Theme-dependent color definitions */
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

/**
 * Build the single CSS file.
 * @param {object} colorsLight - exported AppColorsLight
 * @param {object} colorsDark  - exported AppColors
 * @param {string} outFileCss  - absolute path to write
 */
function buildColorsCss(colorsLight, colorsDark, outFileCss) {
  // Ensure keys/values exist and are hex
  const validate = (obj, label) => {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v !== 'string' || !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) {
        throw new Error(`${label}.${k} must be a hex string like #rrggbb`);
      }
    }
  };
  validate(colorsLight, 'AppColorsLight');
  validate(colorsDark, 'AppColors');

  const css = generateCss({light: colorsLight, dark: colorsDark});
  const changed = writeIfChanged(outFileCss, css);
  return {outFileCss, changed};
}

module.exports = {buildColorsCss, hexToRgbTriplet, toKebab};
