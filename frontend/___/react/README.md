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

**bower**: download libraries.<br>
**clean**: clean generated files.<br>
**default**: watch for debug version of js and css processing.<br>
**prod**: clean and generate release version of files.
