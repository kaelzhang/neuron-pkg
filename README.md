[![Build Status](https://travis-ci.org/kaelzhang/node-module-id.svg?branch=master)](https://travis-ci.org/kaelzhang/node-module-id)
[![Coverage](https://codecov.io/gh/kaelzhang/node-module-id/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/node-module-id)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/node-module-id?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/node-module-id)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/module-id.svg)](http://badge.fury.io/js/module-id)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/module-id.svg)](https://www.npmjs.org/package/module-id)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/node-module-id.svg)](https://david-dm.org/kaelzhang/node-module-id)
-->

# module-id

Parse commonjs module id into name, version and path.

## Install

```bash
$ npm install module-id --save
```

## id(module_id)

```js
const id = require('module-id')

const parsed = id('a/abc.js')

parsed.name     // 'a',
parsed.version  // undefined,
parsed.path     // '/abc.js'

parsed.id       // 'a/abc.js'
parsed.url      // 'a/*/abc.js', the normalized url path
parsed.pkg      // 'a@*'

// Change version
parsed.version = '1.1.0'
parsed.id       // 'a@1.1.0/abc.js'
```

## About Scoped Packages

### Getter: .name

The name of a package, i.e. the `name` field of package.json, supports [scoped package](https://docs.npmjs.com/misc/scope) names

Setting `scope` will affect the value of `name`

```js
const parsed = id('a/index.js')

parsed.scope   // undefined

parsed.scope = 'facebook'

parsed.name    // '@facebook/a'
parsed.id      // '@facebook/a/index.js'
```

### Setter: .name

If the given value of `name` is a scoped package name, it will also affect the `scope` property

```js
const parsed = id('a/index.js')
parsed.name = '@facebook/a'

parsed.scope   // 'facebook'
```

## License

[MIT](LICENSE)
