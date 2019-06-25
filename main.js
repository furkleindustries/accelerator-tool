/* Ensure that promises which reject and are not caught cause errors. */
import './catchUnhandledRejections';

const cliPath = require.resolve('accelerator-tool-cli', process.cwd());

module.exports = require(cliPath);
