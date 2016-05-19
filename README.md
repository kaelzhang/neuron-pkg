[![NPM version](https://badge.fury.io/js/module-id.svg)](http://badge.fury.io/js/module-id)
[![Build Status](https://travis-ci.org/kaelzhang/node-module-id.svg?branch=master)](https://travis-ci.org/kaelzhang/node-module-id)

# module-id

Utility to parse commonjs module id.

## Install

```bash
$ npm install module-id --save
```

## id(module_id)

```js
const id = require('module-id')

let parsed = id('a/abc.js')

parsed.name     // 'a',
parsed.version  // undefined,
parsed.path     // '/abc.js'

parsed.id       // 'a/abc.js'
parsed.url      // 'a/*/abc.js', the normalized url path
parsed.pkg      // 'a@*'

// Flavored with scope package name
parsed.name = '@facebook/b'

parsed.name     // '@facebook/b'
parsed.scope    // 'facebook', setting `name` will affect `scope`
parsed.id       // '@facebook/b/abc.js'

// Change scope only
parsed.scope = 'airbnb'

parsed.name     // '@airbnb/b'
parsed.scope    // '@airbnb'
parsed.id       // '@airbnb/b/abc.js'

// Change version
parsed.version = '1.1.0'
parsed.id       // '@airbnb/b@1.1.0/abc.js'


### Getter: .name

The name of a package, i.e. the `name` field of package.json, support [scoped package](https://docs.npmjs.com/misc/scope) name

Setting `scope` will affect the value of `name`

```js
let parsed = id('a/index.js')
parsed.scope = 'facebook'
parsed.name = '@facebook/a'
parsed.id = '@facebook/a/index.js'
```

### Setter: .name

If the given value of `name` is a scoped package name, it will also affect the `scope` property

```js
let parsed = id('a/index.js')
parsed.name = '@facebook/a'
parsed.scope = 'facebook'
```

## License

MIT
