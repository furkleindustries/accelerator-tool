module.exports = function idIsValid(id) {
  return Boolean(
    id &&
    typeof id === 'string' &&
    !/%/.test(id)
  );
};
