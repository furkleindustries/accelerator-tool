const chalk = require('chalk');
const log = require('./log');

module.exports = function npmLogWithColor(data) {
  log(data, chalk.rgb.bind(chalk)(155, 155, 155));
};
