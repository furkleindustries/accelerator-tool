/* Ensure that promises which reject and are not caught cause errors. */
import './catchUnhandledRejections';

const cwd = process.cwd();
const cliPath = require.resolve('accelerator-tool-cli', { paths: [ cwd ] });

module.exports = require(cliPath);
