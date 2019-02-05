const fs = require('fs-extra');

module.exports = async function makeStoryDirectory(directory) {
  try {
    await fs.mkdir(directory);
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error(`The directory, ${directory}, already exists.`);
    } else {
      throw err;
    }
  }
};
