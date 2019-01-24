const {
  assert,
} = require('ts-assertions');

const makeReplacement = require('./makeReplacement');

module.exports = function makeTemplateReplacements({
  data,
  dontReplacePublicUrl,
  name,
})
{
  assert(data);
  assert(name);
  
  let modifiedData = String(data);
  modifiedData = makeReplacement(modifiedData, '%NAME%', name);

  Object.keys(process.env).forEach((key) => {
    if (!dontReplacePublicUrl && key === 'PUBLIC_URL') {
      modifiedData = makeReplacement(
        modifiedData,
        `%${key}%`,
        process.env[key],
      );
    } else if (/^ACCELERATOR_[^_]/.test(key)) {
      /* Remove ACCELERATOR_ prefix. */
      const truncated = key.slice(12);
      modifiedData = makeReplacement(
        modifiedData,
        `%${truncated}%`,
        process.env[key],
      );
    }
  });

  return modifiedData;
};
