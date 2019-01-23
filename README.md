![Accelerator speedometer logo](https://s3.amazonaws.com/furkleindustries-accelerator/logo_320px.png "Accelerator speedometer logo")

# accelerator-tool

The devtool for the Accelerator story framework ([git repository](https://github.com/furkleindustries/accelerator-core), [npm package](https://npmjs.com/package/accelerator-core)), allowing quick creation of new projects, and new assets within them.

## Installation

With a command-line shell of your choice, either install the program globally:

`npm install -g accelerator-tool`

or use the `npx` tool to temporarily download it and execute your command:

`npx accelerator-tool whatever`

## Usage

There are several basic functions you can use with this tool.

#### Creating new stories
Use the `create` subcommand like so:

`accelerator-tool create my-new-story [optional directory to create]`

### Creating story assets

Each of the following defaults to generating TypeScript code, but can be instructed to generate JavaScript code by appending `-js` to the name of the asset, e.g. `passage` for TypeScript and `passage-js` for JavaScript.

If you do not provide the story directory as the last positional argument, you must be in the root directory of an Accelerator story, containing a `passages` subdirectory.

#### Creating new passages

`accelerator-tool new passage my-new-passage`

#### Creating new headers

`accelerator-tool new header my-new-header`

#### Creating new footers

`accelerator-tool new footer my-new-footer`

#### Creating new plugins

`accelerator-tool new plugin my-new-plugin`
