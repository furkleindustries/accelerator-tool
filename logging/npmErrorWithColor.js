const chalk = require('chalk');
const error = require('colorful-logging/error');
const log = require('colorful-logging/log');

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
    log(stringified, chalk.rgb(155, 155, 155));
  }
};
