import {
  makeNewAsset,
} from './makeNewAsset';
import * as path from 'path';

export async function makeNewPlugin({
  config,
  directory,
  forceJavaScript,
  name,
  noTests,
})
{
  const type = 'plugin';
  const destinationDir = path.join(directory, `${type}s`);
  /* Plugins do not have any styling by default. */
  const includeStyle = false;
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
