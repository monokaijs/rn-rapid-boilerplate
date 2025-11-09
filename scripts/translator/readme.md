# Translation Script

Automated translation tool for managing multi-language support in your React Native app. Supports both Google Translate and OpenAI for translating your app's text content.

## Features

- 🌍 **Dual Translation Providers**: Choose between Google Translate (free) or OpenAI (more accurate)
- 🎨 **Interactive CLI**: Colored prompts using chalk for better user experience
- 🔄 **Automatic Sync**: Detects missing and obsolete translation keys
- 📦 **Modular Architecture**: Clean, maintainable code structure
- ⚡ **Batch Processing**: Translates all configured languages in one run

## Quick Start

```bash
yarn generate-translation
```

When prompted, select your preferred translation service:
- **Option 1**: Google Translate (Free, Fast)
- **Option 2**: OpenAI (Requires API Key, More Accurate)

## Configuration

### 1. Add Supported Languages

Edit `scripts/translator/config.js` to add or remove languages:

```javascript
const supportedLanguages = [
  { key: 'vi', name: 'Vietnamese' },
  { key: 'bn', name: 'Bengali' },
  { key: 'cn', name: 'Chinese' },
  { key: 'fil', name: 'Filipino' },
  { key: 'fr', name: 'French' },
  { key: 'hi', name: 'Hindi' },
  { key: 'id', name: 'Indonesia' },
  { key: 'ar', name: 'Arabic' },
];
```

**Language Key Format**:
- Use standard language codes (ISO 639-1)
- The `key` will be used as the filename (e.g., `vi.json`)
- The `name` is the full language name for display

### 2. Set Base Language Path

The script reads from and writes to `src/config/locales/` by default. To change this:

```javascript
const baseLangPath = path.join(__dirname, '..', '..', 'src', 'config', 'locales');
```

### 3. Configure OpenAI (Optional)

If you want to use OpenAI for translations, add your API key to `.env`:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

**Note**: Google Translate doesn't require any API key configuration.

## Translation Providers

### Google Translate

**Pros**:
- ✅ Free to use
- ✅ Fast translation
- ✅ No API key required
- ✅ Good for general content

**Cons**:
- ❌ Less context-aware
- ❌ May not preserve app-specific terminology

**Best for**: Quick translations, development, testing

### OpenAI

**Pros**:
- ✅ More accurate and context-aware
- ✅ Preserves app-specific terminology
- ✅ Better handling of technical terms
- ✅ Understands social media context

**Cons**:
- ❌ Requires API key
- ❌ Costs money (based on usage)
- ❌ Slower than Google Translate

**Best for**: Production apps, final translations, quality content

## How It Works

### 1. Base Language File

The script uses `src/config/locales/en.json` as the source of truth. Example:

```json
{
  "welcome": "Welcome",
  "login": "Login",
  "logout": "Logout",
  "settings": "Settings"
}
```

### 2. Translation Process

For each configured language, the script:

1. **Loads** the base English file
2. **Compares** with existing translation file (if any)
3. **Detects** missing keys (in English but not in target language)
4. **Detects** obsolete keys (in target language but not in English)
5. **Translates** missing keys using selected provider
6. **Removes** obsolete keys
7. **Saves** updated translation file with keys in the same order as English

### 3. Output Files

Translation files are saved as `src/config/locales/{language-key}.json`:

```
src/config/locales/
├── en.json      # Base language (source of truth)
├── vi.json      # Vietnamese
├── fr.json      # French
├── ar.json      # Arabic
└── ...
```

## Usage Examples

### First Time Setup

```bash
# 1. Add your languages to config.js
# 2. Create your base English file (en.json)
# 3. Run the script
yarn generate-translation

# 4. Select translator (1 for Google, 2 for OpenAI)
# 5. Wait for all languages to be processed
```

### Updating Translations

When you add new keys to `en.json`:

```json
{
  "welcome": "Welcome",
  "login": "Login",
  "new_feature": "New Feature"  // ← New key added
}
```

Run the script again:

```bash
yarn generate-translation
```


The script will:
- Detect `new_feature` is missing in all language files
- Translate only the new key
- Keep existing translations unchanged

### Removing Old Keys

When you remove keys from `en.json`, the script automatically removes them from all translation files.

## Customization

### Modify Translation Prompt (OpenAI)

Edit `scripts/translator/translators.js` to customize the OpenAI prompt:

```javascript
const messages = [
  {
    role: 'user',
    content:
      `You are a translation assistant helping translate phrases for a social network utilities mobile app.\n` +
      `I need you to translate ONLY the values (not the keys) in this JSON object to ${langName}.\n` +
      // Add your custom instructions here
  }
];
```

### Change OpenAI Model

In `scripts/translator/translators.js`:

```javascript
const response = await openai.chat.completions.create({
  model: 'o1-mini',  // Change to 'gpt-4', 'gpt-3.5-turbo', etc.
  messages,
});
```

### Add Language Code Mapping (Google Translate)

If Google Translate uses different language codes, update the mapping in `scripts/translator/translators.js`:

```javascript
const LANGUAGE_CODE_MAP = {
  'vi': 'vi',
  'bn': 'bn',
  'cn': 'zh-CN',  // Map 'cn' to Google's 'zh-CN'
  'fil': 'fil',
  // Add more mappings as needed
};
```

## Troubleshooting

### "OPENAI_API_KEY not found"

**Solution**: Add your OpenAI API key to `.env` file or use Google Translate instead.

### "Base language file not found"

**Solution**: Ensure `src/config/locales/en.json` exists and contains valid JSON.

### Translations are incorrect

**Solutions**:
- Try switching to OpenAI for better accuracy
- Customize the translation prompt for your specific use case
- Manually review and edit the generated translations

### Script hangs or times out

**Solutions**:
- Check your internet connection
- If using OpenAI, verify your API key is valid and has credits
- Try translating fewer languages at once

## File Structure

```
scripts/translator/
├── index.js          # Main entry point with user selection
├── config.js         # Language and path configuration
├── fileUtils.js      # File operations (load, save, compare)
├── translators.js    # Google & OpenAI implementations
├── logger.js         # Colored logging utilities
└── README.md         # This file
```

## Best Practices

1. **Always use English as base**: Keep `en.json` as your source of truth
2. **Review translations**: Automated translations may need manual review
3. **Use OpenAI for production**: More accurate for user-facing content
4. **Use Google for development**: Fast iterations during development
5. **Version control**: Commit translation files to track changes
6. **Test thoroughly**: Verify translations in the actual app UI

## Advanced Usage

### Programmatic Usage

You can import and use the translator functions directly:

```javascript
const { translateWithGoogle, translateWithOpenAI } = require('./scripts/translator/translators');

const missingKeys = {
  "hello": "Hello",
  "goodbye": "Goodbye"
};

// Using Google Translate
const translated = await translateWithGoogle(missingKeys, 'Vietnamese', 'vi');

// Using OpenAI
const translated = await translateWithOpenAI(missingKeys, 'Vietnamese');
```

### CI/CD Integration

Add to your CI/CD pipeline to ensure translations are up-to-date:

```yaml
# .github/workflows/translations.yml
- name: Check translations
  run: |
    yarn generate-translation
    git diff --exit-code src/config/locales/
```

## Support

For issues or questions:
1. Check this README
2. Review the code in `scripts/translator/`
3. Check the console output for error messages
4. Verify your configuration in `config.js`

## License

Part of the React Native Boilerplate project.
