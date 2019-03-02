import {
  getInputNouns,
} from './getInputNouns';
import {
  validateNpmPackageName,
} from 'validate-npm-package-name';

export function nameIsValid(name) {
  if (!name) {
    return new Error('No name was provided.');
  } else if (typeof name !== 'string') {
    return new Error('The name was not a string.');
  } else if (/%/.test(name)) {
    return new Error('The % character cannot be used in an name.');
  }

  if (getInputNouns().includes(name)) {
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
