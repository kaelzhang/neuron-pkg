const test = require('ava')
// const log = require('util').debuglog('module-id')
const id = require('../src')

const cases = [
  {
    id: 'a',

    scope: undefined,
    name: 'a',
    version: undefined,
    path: undefined,

    pkg: 'a@*',
    url: 'a/*/a.js'
  },
  {
    id: 'a@1.1.0',

    scope: undefined,
    name: 'a',
    version: '1.1.0',
    path: undefined,

    pkg: 'a@1.1.0',
    url: 'a/1.1.0/a.js'
  },
  {
    id: 'a@1.1.0/a',

    scope: undefined,
    name: 'a',
    version: '1.1.0',
    path: '/a',

    pkg: 'a@1.1.0',
    url: 'a/1.1.0/a'
  },
  {
    id: 'a@~1.1.0/a',

    scope: undefined,
    name: 'a',
    version: '~1.1.0',
    path: '/a',

    pkg: 'a@~1.1.0',
    url: 'a/~1.1.0/a'
  },
  {
    id: 'a/a',

    scope: undefined,
    name: 'a',
    version: undefined,
    path: '/a',

    pkg: 'a@*',
    url: 'a/*/a'
  },
  {
    id: 'a@hahah/a',

    scope: undefined,
    name: 'a',
    version: 'hahah',
    path: '/a',

    pkg: 'a@hahah',
    url: 'a/hahah/a'
  },
  {
    id: 'a/a.css',

    scope: undefined,
    name: 'a',
    version: undefined,
    path: '/a.css',

    pkg: 'a@*',
    url: 'a/*/a.css'
  },
  {
    id: '@a/a/a.css',

    scope: 'a',
    name: '@a/a',
    version: undefined,
    path: '/a.css',

    pkg: '@a/a@*',
    url: 'a/a/*/a.css'
  },
  {
    id: '@a/a@1.0.0/a.css',

    scope: 'a',
    name: '@a/a',
    version: '1.0.0',
    path: '/a.css',

    pkg: '@a/a@1.0.0',
    url: 'a/a/1.0.0/a.css'
  }
]


// function t.is_type (type, actual, t.ised) {
//   t.is(`${type}:${actual}`, `${type}:${t.ised}`)
// }


function e (t, p, c) {
  [
    'scope',
    'name',
    'version',
    'path',

    'id',
    'pkg',
    'url'

  ].forEach(key => {
    t.is(p[key], c[key], key)
  })
}

cases.forEach(c => {
  test(c.id, t => {
    const p = id(c.id)
    e(t, p, c)
  })
})

test('should throw error if id is not a string', t => {
  t.throws(() => id(), {
    code: 'INVALID_TYPE'
  })
})

test('number type', t => {
  t.throws(() => id(1), {
    code: 'INVALID_TYPE'
  })
})

test('invalid module id', t => {
  t.throws(() => id('/abc'), {
    code: 'INVALID_MODULE_ID'
  })
})

test('no scope', t => {
  const p = id('a/a')
  p.name = 'b'

  t.is(p.name, 'b')
  t.is(p.id, 'b/a')
  t.is(p.scope)
})

test('scope -> no scope', t => {
  const p = id('@a/a')
  p.name = 'a'
  t.is(p.name, 'a')
  t.is(p.id, 'a')
  t.is(p.scope)
})

test('scope -> scope', t => {
  const p = id('@a/a/css')
  p.name = '@b/a'

  t.is(p.name, '@b/a')
  t.is(p.scope, 'b')
  t.is(p.id, '@b/a/css')
})
