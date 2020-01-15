import chalk from 'chalk';
import {
  log,
} from 'colorful-logging';

export function npmLogWithColor(data) {
  log(data, chalk.rgb(155, 155, 155));
}
