import{
  log,
} from 'colorful-logging/log';
import * as fs from 'fs-extra';
import * as path from 'path';

const somethingWentWrongIfYouSawThis =
  `If you're reading this, something went wrong. There was probably an ` +
  'issue when creating and installing the story, and you should delete it ' +
  'and try again.';

export async function writeTempPackageJson(directory) {
  log('Writing temporary package.json.');

  const tempPackageJson = JSON.stringify({
    description: somethingWentWrongIfYouSawThis,
    name: '__accelerator-story-creation-TEMP',
    license: 'UNLICENSED',
    private: true,
    repository: 'N/A',
    version: '0.0.1',
  });

  await fs.writeFile(path.join(directory, 'package.json'), tempPackageJson);
}
