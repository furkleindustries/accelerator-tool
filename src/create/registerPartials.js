import {
  readFile,
} from 'fs-extra';
import glob from 'glob';
import {
  registerPartial,
} from 'handlebars';
import {
  basename,
  join,
} from 'path';

export const registerPartials = (directory) => (
  new Promise((resolve, reject) => glob(
    join(directory, 'templates', '*.hbs'),
    async (err, matches) => {
      if (err) {
        return reject(err);
      }

      const fixedFiles = matches.filter((aa) => !aa.endsWith('index.hbs'));
      const basenames = fixedFiles.map((aa) => (
        basename(aa).slice(0, -3)
      ));

      let files;

      try {
        files = await Promise.all(
          fixedFiles.map((path) => readFile(path, 'utf8')),
        );
      } catch (err) {
        return reject(err);
      }

      files.forEach((content, index) => (
        registerPartial(basenames[index], content)
      ));

      return resolve();
    }),
  )
);
