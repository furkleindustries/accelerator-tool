const processLogLine = require('./processLogLine');

module.exports = function warn(value, colorFormatter, bgColorFormatter) {
  console.warn(processLogLine(value, colorFormatter, bgColorFormatter));
};
