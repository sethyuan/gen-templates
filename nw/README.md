# {{{displayName}}}

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

**bower**: download libraries.

**clean**: clean generated files.

**dev**: generate debug bundle.

**prod**: generate production bundle.

**default**: watch and generate debug bundle.
