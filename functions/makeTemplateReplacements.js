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
  assert(
    config,
    'The config argument was not provided to makeTemplateReplacements.',
  );

  delete config.name;

  if (dontReplacePublicUrl) {
    delete config.publicUrl;
  }

  let updated = makeReplacement(data, 'name', name);

  return Object.keys(config).reduce((prev, key) => (
    makeReplacement(
      prev,
      `%${key}%`,
      config[key],
    )
  ), updated);
};
