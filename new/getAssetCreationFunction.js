import {
  makeNewFooter,
} from './makeNewFooter';
import {
  makeNewHeader,
} from './makeNewHeader';
import {
  makeNewPassage,
} from './makeNewPassage';
import {
  makeNewPlugin,
} from './makeNewPlugin';
import {
  assert,
} from 'ts-assertions';

export function getAssetCreationFunction(type) {
  let func;
  if (/^passage$/.test(type)) {
    func = makeNewPassage;
  } else if (/^header$/.test(type)) {
    func = makeNewHeader;
  } else if (/^footer$/.test(type)) {
    func = makeNewFooter;
  } else if (/^plugin$/.test(type)) {
    func = makeNewPlugin;
  }

  assert(
    typeof func === 'function',
    'The type has not been implemented.',
  );

  return func;
}
