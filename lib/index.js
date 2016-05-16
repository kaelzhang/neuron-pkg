'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = parse;
parse.format = _format;

var REGEX_PARSE_ID = /^((?:[^\/])+?)(?:@([^\/]+))?(\/.*)?$/;
// On android 2.2,
// `[^\/]+?` will fail to do the lazy match, but `(?:[^\/]+?)` works.
// Shit, go to hell!

// @param {string} resolved path-resolved module identifier
function parse(name, version, path) {
  if (!name) {
    throw new TypeError('`id` must be a string.');
  }

  if (arguments.length === 3) {
    return new Pkg(name, version, path);
  }

  if (arguments.length === 2) {
    return new Pkg(name, version, '');
  }

  var id = name;

  var match = id.match(REGEX_PARSE_ID);
  name = match[1];

  // 'a/inner' -> 'a@latest/inner'
  version = match[2];
  path = match[3] || '';

  // There always be matches
  return new Pkg(name, version, path);
}

var Pkg = function () {
  function Pkg(name, version, path) {
    _classCallCheck(this, Pkg);

    this.name = name;
    this.version = version;
    this.path = path;
  }

  _createClass(Pkg, [{
    key: 'format',
    value: function format() {
      return _format(this);
    }
  }, {
    key: 'normalize_url',
    value: function normalize_url() {
      return this.name + '/' + (this.version || '*') + (this.path || '/' + this.name + '.js');
    }
  }, {
    key: 'pkg',
    get: function get() {
      return this.name + '@' + (this.version || '*');
    }
  }]);

  return Pkg;
}();

function _format(obj) {
  if (Object(obj) !== obj) {
    throw new TypeError('`obj` must be an object.');
  }

  var version_slice = obj.version ? '@' + obj.version : '';

  return obj.name + version_slice + (obj.path || '');
}