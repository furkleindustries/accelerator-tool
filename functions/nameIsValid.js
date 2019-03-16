import {
  getNounNormalizationTable,
} from './getNounNormalizationTable';

const validateNpmPackageName = require('validate-npm-package-name');

export function nameIsValid(name) {
  if (!name) {
    return new Error('No name was provided.');
  } else if (typeof name !== 'string') {
    return new Error('The name was not a string.');
  } else if (/[{}]/.test(name)) {
    return new Error('The { and } characters cannot be used in an name.');
  }

  if (Object.keys(getNounNormalizationTable()).indexOf(name) !== -1) {
    return new Error('The name matched one of the reserved nouns for new ' +
                     'assets.');
  }

  const {
    errors,
    validForNewPackages,
  } = validateNpmPackageName(name);

  if (!validForNewPackages) {
    throw new Error(errors.join('\n'));
  }

  return true;
}
