const makeReplacement = require('./makeReplacement');
const {
  assert,
} = require('ts-assertions');

module.exports = function makeTemplateReplacements({
  config,
  data,
  dontReplacePublicUrl,
  name,
})
{
  assert(config);
  assert(data);
  assert(name);

  if (dontReplacePublicUrl) {
    delete config.publicUrl;
  }
  
  let modifiedData = makeReplacement(String(data), '%name%', name);
  modifiedData = Object.keys(config).reduce((prev, key) => {
    return makeReplacement(
      prev,
      `%${key}%`,
      config[key],
    );
  }, modifiedData);

  modifiedData = makeReplacement(modifiedData, '%ifid%', ifidStr);

  return modifiedData;
};
