const checkForFilepathReqs = require('./checkForFilepathReqs');
const error = require('../logging/error');
const getNounFunction = require('./getNounFunction');
const log = require('../logging/log');
const nameIsValid = require('../functions/nameIsValid');

module.exports = async function _new(noun, name, directory) {
  const normalizedNoun = normalizeNoun(noun);
  const type = normalizedNoun.split('-')[0];

  log(
    'Creating ' +
    (normalizedNoun.endsWith('js') ? 'JavaScript' : 'TypeScript') +
    ` ${type} "${chalk.bold(name)}".`
  );

  const validState = nameIsValid(name);
  if (validState instanceof Error) {
    error(validState.message);
    process.exit(1);
  }

  await checkForFilepathReqs(directory);
  await getNounFunction(normalizedNoun)(type, directory, name);

  log(
    (normalizedNoun.endsWith('js') ? 'JavaScript' : 'TypeScript') +
    ` ${type}, "${chalk.bold(name)}," created.`
  );
};
