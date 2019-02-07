const chalk = require('chalk');
const error = require('./error');
const log = require('./log');

module.exports = function npmErrorWithColor(data) {
  const stringified = String(data);
  if (stringified.includes('ERR!')) {
    error(stringified, chalk.red);
  } else if (/^npm WARN../.test(stringified) &&
             !stringified.includes('SKIPPING OPTIONAL DEPENDENCY'))
  {
    error(stringified, chalk.yellow);
  } else if (stringified.includes('notice')) {
    log(stringified);
  } else {
    error(stringified, chalk.rgb(155, 155, 155));
  }
};
