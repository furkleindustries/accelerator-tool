import {
  assert,
} from 'ts-assertions';

export const strings = {
  DATA_INVALID:
    'The data argument provided to the makeReplacement function is not a ' +
    'string with content.',

  KEY_INVALID:
    'The key argument provided to the makeReplacement function is not a ' +
    'string with content.',

  VALUE_INVALID:
    'The value argument provided to the makeReplacement function is not a ' +
    'non-null and non-undefined value.',
};

export function makeReplacement(data, key, value) {
  assert(data && typeof data === 'string', strings.DATA_INVALID);
  assert(key && typeof key === 'string', strings.KEY_INVALID);
  assert(
    typeof value !== 'undefined' && value !== null,
    strings.VALUE_INVALID,
  );

  const valueStr = typeof value === 'object' ?
    JSON.stringify(value, null, 2) :
    value;

  return data.split(key).join(valueStr);
}
