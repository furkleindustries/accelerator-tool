import {
  makeNewAsset,
} from './makeNewAsset';
import * as path from 'path';

export async function makeNewFooter({
  config,
  directory,
  forceCss,
  forceJavaScript,
  name,
  noCssModules,
  noTests,
}) {
  const type = 'footer';
  const destinationDir = path.join(directory, `${type}s`);
  const includeStyle = true;
  const templatesDir = path.join(directory, 'templates', type);

  return await makeNewAsset({
    config,
    destinationDir,
    forceCss,
    forceJavaScript,
    includeStyle,
    name,
    noCssModules,
    noTests,
    templatesDir,
    type,
  });
}
