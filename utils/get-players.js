const { ocrSpace } = require('ocr-space-api-wrapper');
const playerMap = require('./player-map.json');

const blacklistedWords = [
  'new item',
  'transfer',
  'move',
  'quick sell',
  'swap with',
  'duplicate',
  'items',
  'rwb',
  'lwb',
  // 'rwb',
  // 'lwb',
  // 'cdm',
  // 'cam'
];

const getPlayers = async (imagePath) => {
  const result = await ocrSpace(imagePath, {
    apiKey: 'K89963323388957',
  });

  console.log('yyy', result);
  if (result && result.ParsedResults.length > 0) {
    console.log('xxx', result.ParsedResults[0].ParsedText);
    if (!result.ParsedResults[0].ParsedText.length) {
      return [];
    }

    const parsedText = result.ParsedResults[0].ParsedText;
    const items = parsedText
      .split('\n')
      .map((str) => {
        return str.replace('\r', '');
      })
      .filter((v) => {
        if (v.length <= 3) {
          return false;
        }

        let isBlacklisted = false;
        blacklistedWords.forEach((blacklisted) => {
          if (v.toLowerCase().includes(blacklisted.toLowerCase())) {
            isBlacklisted = true;
          }
        });

        if (isBlacklisted) {
          return false;
        }

        if (playerMap[v.toLowerCase()]) {
          return true;
        }

        return true;
      })
      .reduce((acc, text) => {
        if (playerMap[text.toLowerCase()]) {
          acc.push({
            name: text,
            url: playerMap[text.toLowerCase()],
          });
        }
        return acc;
      }, []);

    return items;
  }
  return [];
};

module.exports = {
  getPlayers,
};
