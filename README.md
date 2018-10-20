# accelerator-tool

The devtool for the Accelerator story framework, allowing quick creation of new projects, and new passages within them.

## Installation

Either install the program globally:

`npm install -g accelerator-tool`

or use the `npx` tool to temporarily download it and execute your command:

`npx accelerator-tool whatever`

## Usage

There are two basic tasks you can simplify with this tool: creating new stories, and creating new passages therein.

For the first, use the `create` subcommand like so:

`accelerator-tool create MyNewStory [optional directory to create]`

For the second, you can create either TypeScript passages or JavaScript passages. These are:

* `accelerator-tool new passage MyNewPassage [optional story directory]`
* `accelerator-tool new passage-js MyNewPassage [optional story directory]`

If you do not provide the story directory as a positional argument, you must be in the root directory of an Accelerator story, containing a `passages` subdirectory.
