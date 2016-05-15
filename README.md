[![NPM version](https://badge.fury.io/js/module-id.svg)](http://badge.fury.io/js/module-id)
[![Build Status](https://travis-ci.org/kaelzhang/node-module-id.svg?branch=master)](https://travis-ci.org/kaelzhang/node-module-id)

# module-id

Utility to parse commonjs module id into name, version and path.

## Install

```bash
$ npm install module-id --save
```

## Usage

```js
const module_id = require('module-id')

let parsed = module_id('a@~1.3.0/abc')
// -> {
//   name: 'a',
//   version: '~1.3.0',
//   path: '/abc'
// }

parsed.format()           // -> 'a@~1.3.0/abc'
parsed.normalize_url()    // -> 'a/~1.3.0/abc'
parsed.pkg                // -> 'a@~1.3.0'

module_id('a/a.css')
// -> {
//   name: 'a',
//   version: undefined,
//   path: '/a.css'
// }

module_id('a/a.css').normalize_url()   // -> 'a/*/a.css'
```

## License

MIT