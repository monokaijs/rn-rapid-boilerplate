const OpenAI = require('openai');
const log = require('./logger');
const {systemPrompt} = require("./config");

const LANGUAGE_CODE_MAP = {
  'vi': 'vi',
  'bn': 'bn',
  'cn': 'zh-CN',
  'fil': 'fil',
  'fr': 'fr',
  'hi': 'hi',
  'id': 'id',
  'ar': 'ar',
};

function cleanResponse(text) {
  text = text.replace(/^```(?:json|typescript|javascript)?\s*\n/m, '');
  text = text.replace(/\n```$/m, '');
  return text;
}

async function translateWithGoogle(missingObj, langName, langCode) {
  if (Object.keys(missingObj).length === 0) return {};

  const keys = Object.keys(missingObj);
  log.data(`Translating to ${langName}: ${keys.length} keys`, keys.length > 3 ?
    `(${keys.slice(0, 3).join(', ')}...)` : `(${keys.join(', ')})`);

  const targetLangCode = LANGUAGE_CODE_MAP[langCode] || langCode;
  const translatedObj = {};

  try {
    for (const key of keys) {
      const value = missingObj[key];
      const response = await fetch(`https://translate-pa.googleapis.com/v1/translateHtml`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json+protobuf',
          'X-Goog-API-Key': 'AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520'
        },
        body: JSON.stringify([[[value], "auto", targetLangCode], "wt_lib"]),
      });

      const data = await response.json();
      translatedObj[key] = data[0][0];
    }

    log.success(`Successfully translated ${keys.length} keys using Google Translate`);
    return translatedObj;
  } catch (error) {
    log.error(`Google Translate error for ${langName}: ${error.message}`);
    return {};
  }
}

async function translateWithOpenAI(missingObj, langName) {
  if (Object.keys(missingObj).length === 0) return {};

  const keys = Object.keys(missingObj);
  log.data(`Translating to ${langName}: ${keys.length} keys`, keys.length > 3 ?
    `(${keys.slice(0, 3).join(', ')}...)` : `(${keys.join(', ')})`);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const messages = [{
    role: 'system',
    content: systemPrompt
  }, {
    role: 'user',
    content: `Translate this object to ${langName}:\n\n${JSON.stringify(missingObj, null, 2)}`
  }];

  try {
    const response = await openai.chat.completions.create({
      model: 'o1-mini',
      messages,
    });

    const rawContent = response.choices[0].message.content;

    try {
      const cleanedContent = cleanResponse(rawContent);
      const result = JSON.parse(cleanedContent);
      log.success(`Successfully parsed translation response for ${langName}`);
      return result;
    } catch (error) {
      log.warning(`Direct JSON parse failed for ${langName}, trying extraction...`);
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const result = JSON.parse(jsonMatch[0]);
          log.success(`Successfully extracted JSON from response for ${langName}`);
          return result;
        } catch (error) {
          log.error(`Failed to parse extracted JSON for ${langName}: ${error.message}`);
        }
      }
    }

    log.error(`Failed to parse API response for ${langName}`);
    return {};
  } catch (error) {
    log.error(`OpenAI API error for ${langName}: ${error.message}`);
    return {};
  }
}

module.exports = {
  translateWithGoogle,
  translateWithOpenAI,
};
