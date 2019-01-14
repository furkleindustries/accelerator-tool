const checkForFilepathReqs = require('./checkForFilepathReqs');
const nameIsValid = require('../functions/idIsValid');
const makeNewFooter = require('./makeNewFooter');
const makeNewHeader = require('./makeNewHeader');
const makeNewPassage = require('./makeNewPassage');
const makeNewPlugin = require('./makeNewPlugin');
const normalizeNoun = require('./normalizeNoun');

module.exports = async function _new(noun, name, directory) {
  const validState = nameIsValid(name);
  if (validState instanceof Error) {
    throw validState;
  }

  await checkForFilepathReqs(directory);

  const normalizedNoun = normalizeNoun(noun);
  const type = normalizedNoun.split('-')[0];
  let func;
  if (/^passage-[jt]s$/.test(normalizedNoun)) {
    func = makeNewPassage;
  } else if (/^header-[jt]s$/.test(normalizedNoun)) {
    func = makeNewHeader;
  } else if (/^footer-[jt]s$/.test(normalizedNoun)) {
    func = makeNewFooter;
  } else if (/^plugin-[jt]s$/.test(normalizedNoun)) {
    func = makeNewPlugin;
  }

  if (!func) {
    throw new Error('The normalized noun has not been implemented.');
  }

  await func(normalizedNoun, directory, name);

  console.log(
    (normalizedNoun.endsWith('js') ? 'JavaScript' : 'TypeScript') +
    ` ${type}, "${name}," created.`
  );
};
