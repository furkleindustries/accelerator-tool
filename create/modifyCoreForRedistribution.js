import {
  log,
} from 'colorful-logging';
import {
  renameCodeWorkspace,
} from './renameCodeWorkspace';
import {
  rewriteConfig,
} from './rewriteConfig';
import {
  rewriteIndexHtml,
} from './rewriteIndexHtml';
import {
  rewritePackageJson,
} from './rewritePackageJson';
import {
  rewriteTslint,
} from './rewriteTslint';

export async function modifyCoreForRedistribution(directory, name, coreVersion) {
  log('Modifying core for redistribution.');

  const config = await rewriteConfig(directory, name, coreVersion);

  await Promise.all([
    renameCodeWorkspace(directory, name),
    rewriteIndexHtml(directory, config, name),
    rewritePackageJson(directory, name),
    rewriteTslint(directory),
  ]);

  log('Finished modifying core.');
}
