const nounNormalizationTable = require('./nounNormalizationTable');

module.exports = function getInputNouns() {
  return Object.keys(nounNormalizationTable);
};
