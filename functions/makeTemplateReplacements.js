const makeReplacement = require('./makeReplacement');
const {
  assert,
} = require('ts-assertions');

module.exports = function makeTemplateReplacements({
  config,
  data,
  dontReplacePublicUrl,
})
{
  assert(config);

  if (dontReplacePublicUrl) {
    delete config.publicUrl;
  }

  return Object.keys(config).reduce((prev, key) => (
    makeReplacement(
      prev,
      `%${key}%`,
      config[key],
    )
  ), data);
};
