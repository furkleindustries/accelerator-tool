import {
  getNounNormalizationString,
} from './getNounNormalizationString'; 

const javascript = 'js';
const typescript = 'ts';

export function getNounNormalizationObject(noun) {
  const jsDef = getNounNormalizationString(noun, javascript);
  const tsDef = getNounNormalizationString(noun, typescript);

  return {
    [noun]: tsDef,
    [tsDef]: tsDef,
    [`${tsDef}x`]: `${tsDef}x`,
    [jsDef]: jsDef,
    [`${jsDef}x`]: `${jsDef}x`,
  };
}
