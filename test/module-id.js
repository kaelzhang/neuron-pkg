'use strict'

var expect = require('chai').expect
var pkg = require('../')

var cases = [
  {
    id: 'a',
    name: 'a',
    version: undefined,
    pkg: 'a@*',
    path: '',
    url: 'a/*/a.js'
  },
  {
    id: 'a@1.1.0',
    name: 'a',
    version: '1.1.0',
    pkg: 'a@1.1.0',
    path: '',
    url: 'a/1.1.0/a.js'
  },
  {
    id: 'a@1.1.0/a',
    name: 'a',
    version: '1.1.0',
    pkg: 'a@1.1.0',
    path: '/a',
    url: 'a/1.1.0/a'
  },
  {
    id: 'a@~1.1.0/a',
    name: 'a',
    version: '~1.1.0',
    pkg: 'a@~1.1.0',
    path: '/a',
    url: 'a/~1.1.0/a'
  },
  {
    id: 'a/a',
    name: 'a',
    version: undefined,
    pkg: 'a@*',
    path: '/a',
    url: 'a/*/a'
  },
  {
    id: 'a@hahah/a',
    name: 'a',
    version: 'hahah',
    pkg: 'a@hahah',
    path: '/a',
    url: 'a/hahah/a'
  },
  {
    id: 'a/a.css',
    name: 'a',
    version: undefined,
    pkg: 'a@*',
    path: '/a.css',
    url: 'a/*/a.css'
  }
]


function expect_type (type, actual, expected) {
  expect(type + ':' + actual).to.equal(type + ':' + expected)
}


cases.forEach(function (c) {
  describe(c.id, function(){
    it("pkg(id)", function(){
      var p = pkg(c.id)
      expect_type('name', p.name, c.name)
      expect_type('version', p.version, c.version)
      expect_type('path', p.path, c.path)
      expect_type('.format()', p.format(), c.id)
      expect_type('format(pkg)', pkg.format(p), c.id)
      expect_type('.normalize_url()', p.normalize_url(p), c.url)
      expect_type('.pkg', p.pkg, c.pkg)
    })
  })
})

describe("error", function () {
  it("should throw error if id is not a string", function(){
    var error
    try {
      pkg()
    } catch(e) {
      error = e
    }

    expect(error).not.to.equal()
  })
})
