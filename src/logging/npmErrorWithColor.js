import {
  error,
  log,
  warn,
} from 'colorful-logging';
import {
  npmLogWithColor,
} from './npmLogWithColor';

export function npmErrorWithColor(data) {
  const stringified = String(data);
  if (stringified.includes('ERR!')) {
    error(stringified);
  } else if (new RegExp(/^npm WARN../).test(stringified) &&
             !stringified.includes('SKIPPING OPTIONAL DEPENDENCY'))
  {
    warn(stringified);
  } else if (stringified.includes('notice')) {
    log(stringified);
  } else {
    npmLogWithColor(stringified);
  }
}
