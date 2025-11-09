require('dotenv').config();
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');
const { supportedLanguages, baseLangPath, englishFilePath } = require('./config');
const { loadLanguageFile, saveLanguageFile, findMissingKeys, findObsoleteKeys, orderTranslationKeys } = require('./fileUtils');
const { translateWithGoogle, translateWithOpenAI } = require('./translators');
const log = require('./logger');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function selectTranslator() {
  console.log('\n' + chalk.bold.cyan('Select Translation Service:'));
  console.log(chalk.yellow('1') + ' - Google Translate (Free, Fast)');
  console.log(chalk.yellow('2') + ' - OpenAI (Requires API Key, More Accurate)');
  console.log('');

  const answer = await askQuestion(chalk.green('Enter your choice (1 or 2): '));

  if (answer === '1') {
    return 'google';
  } else if (answer === '2') {
    if (!process.env.OPENAI_API_KEY) {
      log.error('OPENAI_API_KEY not found in environment variables');
      log.warning('Please add OPENAI_API_KEY to your .env file');
      process.exit(1);
    }
    return 'openai';
  } else {
    log.warning('Invalid choice, defaulting to Google Translate');
    return 'google';
  }
}

async function processLanguage(lang, langCode, translator) {
  log.title(`Processing ${lang} (${langCode})`);

  const baseLanguage = loadLanguageFile(englishFilePath);
  if (Object.keys(baseLanguage).length === 0) {
    log.error(`Base language file not found or empty: ${englishFilePath}`);
    return;
  }

  log.section(langCode, `Loaded base language with ${Object.keys(baseLanguage).length} keys`);

  const targetFilePath = path.join(baseLangPath, `${langCode}.json`);
  const targetLanguage = loadLanguageFile(targetFilePath);

  const targetKeyCount = Object.keys(targetLanguage).length;
  if (targetKeyCount > 0) {
    log.section(langCode, `Found existing translation with ${targetKeyCount} keys`);
  } else {
    log.section(langCode, `No existing translation found, will create new file`);
  }

  const missingKeys = findMissingKeys(baseLanguage, targetLanguage);
  const missingKeyCount = Object.keys(missingKeys).length;

  const obsoleteKeys = findObsoleteKeys(baseLanguage, targetLanguage);
  const obsoleteKeyCount = obsoleteKeys.length;

  if (missingKeyCount > 0) {
    log.section(langCode, `Found ${chalk.yellow(missingKeyCount)} missing keys`);
  } else {
    log.success(`No missing keys for ${langCode}`);
  }

  if (obsoleteKeyCount > 0) {
    log.section(langCode, `Found ${chalk.yellow(obsoleteKeyCount)} obsolete keys to remove`);
  }

  if (missingKeyCount === 0 && obsoleteKeyCount === 0) {
    log.success(`No changes needed for ${langCode}, skipping`);
    return;
  }

  let updatedTranslation = { ...targetLanguage };

  if (obsoleteKeyCount > 0) {
    obsoleteKeys.forEach(key => {
      delete updatedTranslation[key];
    });
    log.success(`Removed ${obsoleteKeyCount} obsolete keys from ${langCode}`);
  }

  if (missingKeyCount > 0) {
    log.section(langCode, `Translating ${missingKeyCount} missing keys...`);

    let translatedKeys;
    if (translator === 'google') {
      translatedKeys = await translateWithGoogle(missingKeys, lang, langCode);
    } else {
      translatedKeys = await translateWithOpenAI(missingKeys, lang);
    }

    const translatedKeyCount = Object.keys(translatedKeys).length;

    if (translatedKeyCount > 0) {
      updatedTranslation = { ...updatedTranslation, ...translatedKeys };
      log.success(`Added ${translatedKeyCount} translated keys to ${langCode}`);
    } else {
      log.warning(`No keys were successfully translated for ${langCode}`);
    }
  }

  const orderedTranslation = orderTranslationKeys(baseLanguage, updatedTranslation);

  Object.keys(baseLanguage).forEach(key => {
    if (orderedTranslation[key] === baseLanguage[key] && targetLanguage[key] === undefined) {
      log.warning(`Using base language value for missing key: ${key}`);
    }
  });

  if (saveLanguageFile(targetFilePath, orderedTranslation)) {
    log.success(`Updated translation file saved for ${langCode} (${Object.keys(orderedTranslation).length} total keys)`);
  }
}

async function processAllLanguages(translator) {
  log.title(`Starting translation process for ${supportedLanguages.length} languages`);
  log.data('Translator:', translator === 'google' ? 'Google Translate' : 'OpenAI');
  log.data('Languages:', supportedLanguages.map(l => `${l.name} (${l.key})`).join(', '));
  log.data('Base language file:', englishFilePath);

  let completed = 0;
  const total = supportedLanguages.length;

  for (const lang of supportedLanguages) {
    try {
      await processLanguage(lang.name, lang.key, translator);
      completed++;
      log.progress(completed, total, `Languages processed`);
    } catch (error) {
      log.error(`Error processing ${lang.name} (${lang.key}): ${error.message}`);
    }
  }

  log.title('Translation process complete');
}

async function main() {
  try {
    const translator = await selectTranslator();
    rl.close();

    await processAllLanguages(translator);
    log.success('All translations have been processed successfully');
  } catch (error) {
    log.error(`Translation process failed: ${error.message}`);
    process.exit(1);
  }
}

main();
