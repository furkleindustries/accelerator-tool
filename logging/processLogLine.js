module.exports = function processLogLine(value, color, bgColor) {
  let output = String(value);
  if (typeof color === 'function') {
    output = color(output);
  }

  if (typeof bgColor === 'function') {
    output = bgColor(output);
  }

  return output;
};
