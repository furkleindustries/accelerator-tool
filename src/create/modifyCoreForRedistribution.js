import {
  log,
} from 'colorful-logging';
import {
  registerPartials,
} from './registerPartials';
import {
  renameCodeWorkspace,
} from './renameCodeWorkspace';
import {
  rewriteConfig,
} from './rewriteConfig';
import {
  rewriteIndexHbs,
} from './rewriteIndexHbs';
import {
  rewritePackageJson,
} from './rewritePackageJson';
import {
  rewriteTslint,
} from './rewriteTslint';

export async function modifyCoreForRedistribution(directory, name, coreVersion) {
  log('Modifying core for redistribution.');

  await registerPartials(directory);
  const config = await rewriteConfig(directory, name, coreVersion);

  await Promise.all([
    renameCodeWorkspace(directory, name),
    rewriteIndexHbs(directory, config, name),
    rewritePackageJson(directory, name),
    rewriteTslint(directory),
  ]);

  log('Finished modifying core.');
}
