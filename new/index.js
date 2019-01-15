const checkForFilepathReqs = require('./checkForFilepathReqs');
const getNounFunction = require('./getNounFunction');
const nameIsValid = require('../functions/nameIsValid');

module.exports = async function _new(noun, name, directory) {
  const validState = nameIsValid(name);
  if (validState instanceof Error) {
    throw validState;
  }

  await checkForFilepathReqs(directory);

  const normalizedNoun = normalizeNoun(noun);
  const type = normalizedNoun.split('-')[0];
  await getNounFunction(normalizedNoun)(type, directory, name);

  console.log(
    (normalizedNoun.endsWith('js') ? 'JavaScript' : 'TypeScript') +
      ` ${type}, "${name}," created.`
  );
};
