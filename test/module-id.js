'use strict'

var expect = require('chai').expect
var id = require('../')

var cases = [
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


function expect_type (type, actual, expected) {
  expect(type + ':' + actual).to.equal(type + ':' + expected)
}


function e (p, c) {
  [
    'scope',
    'name',
    'version',
    'path',

    'id',
    'pkg',
    'url'

  ].forEach((key) => {
    expect_type(key, p[key], c[key])
  })
}

cases.forEach(function (c) {

  describe(c.id, function(){
    it("id(id)", function(){
      var p = id(c.id)
      e(p, c)
    })
  })
})


describe("error", function () {
  it("should throw error if id is not a string", function(){
    var error
    try {
      id()
    } catch(e) {
      error = e
    }

    expect(error).not.to.equal()
  })
})


describe('name setter', function () {
  it('no scope', function () {
    var p = id('a/a')
    p.name = 'b'

    expect(p.name).to.equal('b')
    expect(p.id).to.equal('b/a')
    expect(p.scope).to.equal()
  })

  it('scope -> no scope', function () {
    var p = id('@a/a')
    p.name = 'a'
    expect(p.name).to.equal('a')
    expect(p.id).to.equal('a')
    expect(p.scope).to.equal()
  })

  it('scope -> scope', function () {
    var p = id('@a/a/css')
    p.name = '@b/a'

    expect(p.name).to.equal('@b/a')
    expect(p.scope).to.equal('b')
    expect(p.id).to.equal('@b/a/css')
  })
})
