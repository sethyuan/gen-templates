# {{{name}}}

{{{desc}}}

## Features

## Browser compatibility

IE9 and above are supported.

## Quick start

## Dev Setup

You should have **gulp** and **bower** globally installed. That means, you have to install **Node.js** as well.

Clone the repo and CD into the project folder, then run:

```bash
npm install
bower install
```

Source code is written in **ES6** using Babel.

### Gulp tasks

- __clean__: Delete all generated files.
- __generate-lib__: Generate components entry file (_src/lib.js_).
- __dev__: Make a development build.
- __watch__ (default): Like __dev__ but also watch for changes.
- __prod__: Make a production build.
- __prod-custom__: Make a custom production build. Use it after calling __generate-lib__.
- __default__: Same as __dev__.
