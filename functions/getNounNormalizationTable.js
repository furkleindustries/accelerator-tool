import {
  getInputNouns,
} from './getInputNouns';
import {
  getNounNormalizationObject,
} from './getNounNormalizationObject';

/**
 * Turn the input nodes into a table of normalized asset types.
 */
export function getNounNormalizationTable() {
  return Object.freeze(
    Object.assign(...getInputNouns().map(getNounNormalizationObject)),
  );
}
