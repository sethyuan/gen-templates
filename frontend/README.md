# {{{name}}}

## Dev setup

```bash
# 1. Configure versions of libraries and tools.
vim package.json
vim gulpfile.js

# 2. Install gulp and plugins.
npm install

# 3. Install project libraries using bower.
gulp bower
```

## Gulp tasks

**bower**, download libraries.

**clean**, clean generated files.

**css**, processing of css files.

**js**, processing of js files.

**css-debug**, debug version of *css*.

**js-debug**, debug version of *js*.

**watch**, watch for debug version of js and css processing.

**release**, clean and generate release version of files.
