const makeNewFooter = require('./makeNewFooter');
const makeNewHeader = require('./makeNewHeader');
const makeNewPassage = require('./makeNewPassage');
const makeNewPlugin = require('./makeNewPlugin');
const { assert } = require('ts-assertions');

module.exports = function getAssetCreationFunction(type) {
  let func;
  if (/^passage$/.test(type)) {
    func = makeNewPassage;
  } else if (/^header$/.test(type)) {
    func = makeNewHeader;
  } else if (/^footer$/.test(type)) {
    func = makeNewFooter;
  } else if (/^plugin$/.test(type)) {
    func = makeNewPlugin;
  }

  assert(
    typeof func === 'function',
    'The type has not been implemented.',
  );

  return func;
};
