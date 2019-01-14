const nounNormalizationTable = require('./nounNormalizationTable');

module.exports.normalizeNoun = function normalizeNoun(noun) {
  const normalized = nounNormalizationTable[noun];
  if (!normalized) {
    throw new Error(`The subcommand ${noun} was not recognized by ` +
                    'the accelerator-tool new command.');
  }

  return normalized;
};
