import {
  getNounNormalizationTable,
} from './getNounNormalizationTable';

export function normalizeNoun(noun) {
  const normalized = String(getNounNormalizationTable()[noun]);
  if (!normalized) {
    throw new Error(`The subcommand ${noun} was not recognized by ` +
                    'the accelerator-tool new command.');
  }

  return normalized;
}
