const {
  assert,
} = require('ts-assertions');

module.exports = function makeReplacement(data, key, value) {
  assert(data && typeof data === 'string');
  assert(key && typeof key === 'string');
  assert(value && typeof value === 'string');

  return data.split(key).join(value);
};
