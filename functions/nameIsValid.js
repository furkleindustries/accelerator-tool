module.exports = function nameIsValid(name) {
  if (!name) {
    return new Error('No name was provided.');
  } else if (typeof name !== 'string') {
    return new Error('The name was not a string.');
  } else if (/%/.test(name)) {
    return new Error('The % character cannot be used in an name.');
  }

  return true;
};
