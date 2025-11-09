const path = require("path");

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

const baseLangPath = path.join(__dirname, '..', '..', 'src', 'config', 'locales');
const englishFilePath = path.join(baseLangPath, 'en.json');
const systemPrompt = `You are a translation assistant helping translate phrases for a social network utilities mobile app.\n` +
  `I need you to translate ONLY the values (not the keys) in this JSON object.\n` +
  `Some terms like "Story", "Like", etc. should remain untranslated as they are standard social media terms. ` +
  `For example, React will be translated to "Thả cảm xúc" or "React" in Vietnamese, not "Phản ứng".\n`+
  `Keep newline "\\n" in JSON, don't normalize this character.\n` +
  `Return ONLY a valid JSON object with the same structure but translated values. Do not wrap the response in markdown code blocks.`

module.exports = {
  supportedLanguages,
  baseLangPath,
  englishFilePath,
  systemPrompt
};
