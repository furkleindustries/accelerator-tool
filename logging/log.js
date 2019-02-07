const processLogLine = require('./processLogLine');

module.exports = function log(value, colorFormatter, bgColorFormatter) {
  console.log(processLogLine(value, colorFormatter, bgColorFormatter));
};
