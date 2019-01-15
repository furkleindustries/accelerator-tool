const makeNewFooter = require('./makeNewFooter');
const makeNewHeader = require('./makeNewHeader');
const makeNewPassage = require('./makeNewPassage');
const makeNewPlugin = require('./makeNewPlugin');
module.exports = async function getNounFunction(normalizedNoun) {
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

  return func;
};
