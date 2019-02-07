const nounNormalizationTable = require('./getNounNormalizationTable');

module.exports = function normalizeNoun(noun) {
  const normalized = String(nounNormalizationTable[noun]);
  if (!normalized) {
    throw new Error(`The subcommand ${noun} was not recognized by ` +
                    'the accelerator-tool new command.');
  }

  return normalized;
};
