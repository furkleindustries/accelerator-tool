module.exports = function getDirectory(directory) {
  if (directory) {
    return directory;
  }

  return process.cwd();
}
