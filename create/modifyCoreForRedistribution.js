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

module.exports = async function modifyCoreForRedistribution(directory, name) {
  log('Modifying core for redistribution.');

  const config = await rewriteConfig(directory, name);

  await Promise.all([
    renameCodeWorkspace(directory, name),
    rewriteIndexHtml(directory, config, name),
    rewritePackageJson(directory, name),
    rewriteTslint(directory),
  ]);

  log('Finished modifying core.');
}
