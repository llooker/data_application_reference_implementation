# Data Application Reference Implementation

## Quick instructions

1. Clone repo
2. Run `yarn install`
3. Run `yarn dev`
4. Copy `cp backend/.env.example backend/.env` and fill in variables
5. Open `http:\\localhost:3001` in browser

## Generating documentation
1. Annotate functions, classes, etc. using [jsdoc notation](https://jsdoc.app/)
2. Install jsdoc globally on your machine `npm install -g jsdoc`
3. Output documentation in the `docs` folder: `jsdoc path/to/code -d docs`
   * `-r` recursively scans subfolders too, e.g. to  generate for everything inside `src`: `jsdoc path/to/src -r -d docs`