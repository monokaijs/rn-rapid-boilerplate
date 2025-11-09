const fs = require('fs');
const log = require('./logger');

function loadLanguageFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    log.error(`Error loading language file ${filePath}: ${error.message}`);
  }
  return {};
}

function saveLanguageFile(filePath, data) {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (error) {
    log.error(`Error saving language file ${filePath}: ${error.message}`);
    return false;
  }
}

function findMissingKeys(baseObj, targetObj) {
  const missing = {};
  for (const key in baseObj) {
    if (targetObj[key] === undefined) {
      missing[key] = baseObj[key];
    }
  }
  return missing;
}

function findObsoleteKeys(baseObj, targetObj) {
  const obsolete = [];
  for (const key in targetObj) {
    if (baseObj[key] === undefined) {
      obsolete.push(key);
    }
  }
  return obsolete;
}

function orderTranslationKeys(baseLanguage, translation) {
  const ordered = {};
  Object.keys(baseLanguage).forEach(key => {
    if (translation[key] !== undefined) {
      ordered[key] = translation[key];
    } else {
      ordered[key] = baseLanguage[key];
    }
  });
  return ordered;
}

module.exports = {
  loadLanguageFile,
  saveLanguageFile,
  findMissingKeys,
  findObsoleteKeys,
  orderTranslationKeys,
};

