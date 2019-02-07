const processLogLine = require('./processLogLine');

module.exports = function error(value, colorFormatter, bgColorFormatter) {
  console.error(processLogLine(value, colorFormatter, bgColorFormatter));
};
