import chalk from 'chalk';
const log = require('colorful-logging/log');

export function npmLogWithColor(data) {
  log(data, chalk.rgb(155, 155, 155));
}
