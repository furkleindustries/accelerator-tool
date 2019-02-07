const chalk = require('chalk');
const error = require('./error');

module.exports = function npmErrorWithColor(data) {
  const stringified = String(data);
  if (stringified.includes('ERR!')) {
    error(stringified, chalk.red);
  } else if (stringified.includes('WARN')) {
    error(stringified, chalk.yellow);
  } else {
    error(stringified);
  }
};
