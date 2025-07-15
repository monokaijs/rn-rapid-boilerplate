#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Convert hex color to RGB values
 * @param {string} hex - Hex color (e.g., '#ff0000' or 'ff0000')
 * @returns {string} - RGB values separated by spaces (e.g., '255 0 0')
 */
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r} ${g} ${b}`;
}

/**
 * Convert camelCase to kebab-case
 * @param {string} str - camelCase string
 * @returns {string} - kebab-case string
 */
function camelToKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Parse colors from the colors.ts file
 * @returns {Object} - Object containing dark and light theme colors
 */
function parseColorsFromFile() {
  const colorsFilePath = path.join(__dirname, '../src/config/colors.ts');
  
  if (!fs.existsSync(colorsFilePath)) {
    throw new Error(`Colors file not found at ${colorsFilePath}`);
  }
  
  const content = fs.readFileSync(colorsFilePath, 'utf8');
  
  // Extract AppColors (dark theme)
  const appColorsMatch = content.match(/export const AppColors = \{([\s\S]*?)\};/);
  if (!appColorsMatch) {
    throw new Error('Could not find AppColors export in colors.ts');
  }
  
  // Extract AppColorsLight (light theme)
  const appColorsLightMatch = content.match(/export const AppColorsLight: typeof AppColors = \{([\s\S]*?)\};/);
  if (!appColorsLightMatch) {
    throw new Error('Could not find AppColorsLight export in colors.ts');
  }
  
  // Parse color objects
  const darkColors = parseColorObject(appColorsMatch[1]);
  const lightColors = parseColorObject(appColorsLightMatch[1]);
  
  return { darkColors, lightColors };
}

/**
 * Parse a color object string into key-value pairs
 * @param {string} objectString - String representation of the color object
 * @returns {Object} - Parsed color object
 */
function parseColorObject(objectString) {
  const colors = {};
  
  // Match color definitions like: colorName: '#hexvalue',
  const colorRegex = /(\w+):\s*['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = colorRegex.exec(objectString)) !== null) {
    const [, colorName, colorValue] = match;
    
    // Skip comments and non-hex values
    if (colorValue.startsWith('#')) {
      colors[colorName] = colorValue;
    }
  }
  
  return colors;
}

/**
 * Generate CSS custom properties for a theme
 * @param {Object} colors - Color object
 * @param {string} prefix - CSS variable prefix (e.g., '--color-')
 * @returns {string} - CSS custom properties
 */
function generateCssProperties(colors, prefix = '--color-') {
  const properties = [];
  
  Object.entries(colors).forEach(([colorName, hexValue]) => {
    const kebabName = camelToKebab(colorName);
    const rgbValue = hexToRgb(hexValue);
    const cssVarName = `${prefix}${kebabName}`;
    
    properties.push(`  ${cssVarName}: ${rgbValue}; /* ${hexValue} */`);
  });
  
  return properties.join('\n');
}

/**
 * Generate the complete global.css content
 * @param {Object} darkColors - Dark theme colors
 * @param {Object} lightColors - Light theme colors
 * @returns {string} - Complete CSS content
 */
function generateGlobalCss(darkColors, lightColors) {
  const lightProperties = generateCssProperties(lightColors);
  const darkProperties = generateCssProperties(darkColors);
  
  return `@import "custom.css";
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Theme-dependent color definitions */
:root {
  /* Light theme colors */
${lightProperties}
}

.dark {
  /* Dark theme colors */
${darkProperties}
}
`;
}

/**
 * Main function to generate the global.css file
 */
function main() {
  try {
    console.log('🎨 Generating global.css from colors.ts...');
    
    // Parse colors from the TypeScript file
    const { darkColors, lightColors } = parseColorsFromFile();
    
    console.log(`📊 Found ${Object.keys(darkColors).length} dark theme colors`);
    console.log(`📊 Found ${Object.keys(lightColors).length} light theme colors`);
    
    // Generate CSS content
    const cssContent = generateGlobalCss(darkColors, lightColors);
    
    // Write to global.css
    const outputPath = path.join(__dirname, '../src/config/global.css');
    fs.writeFileSync(outputPath, cssContent, 'utf8');
    
    console.log(`✅ Successfully generated ${outputPath}`);
    console.log('🚀 You can now use these colors in your Tailwind classes!');
    
  } catch (error) {
    console.error('❌ Error generating global.css:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = {
  hexToRgb,
  camelToKebab,
  parseColorsFromFile,
  generateGlobalCss,
  main
};
