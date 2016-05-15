[![NPM version](https://badge.fury.io/js/module-id.svg)](http://badge.fury.io/js/module-id)
[![Build Status](https://travis-ci.org/kaelzhang/node-module-id.svg?branch=master)](https://travis-ci.org/kaelzhang/node-module-id)

# module-id

Utility to parse commonjs module id into name, version and path.

## Install

```bash
$ npm install module-id --save
```

## id(module_id)

```js
const id = require('module-id')

let parsed = id('a@~1.3.0/abc')
// -> {
//   name: 'a',
//   version: '~1.3.0',
//   path: '/abc'
// }

parsed.format()           // -> 'a@~1.3.0/abc'
parsed.normalize_url()    // -> 'a/~1.3.0/abc'
parsed.pkg                // -> 'a@~1.3.0'

id('a/a.css')
// -> {
//   name: 'a',
//   version: undefined,
//   path: '/a.css'
// }

id('a/a.css').normalize_url()   // -> 'a/*/a.css'
```

## id(name, version, path)

```js
id('a', '1.1.0', '/a.css').format()  // -> 'a@1.1.0/a.css'
```

## License

MIT