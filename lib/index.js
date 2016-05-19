'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = parse;
parse.format = format;

// @param {string} resolved path-resolved module identifier
function parse(id) {
  if (!id) {
    throw new TypeError('`id` must be a string.');
  }

  // There always be matches
  return new Pkg(parse_module_id(id));
}

// @const
// 'a@1.2.3/abc' ->
// ['a@1.2.3/abc', 'a', '1.2.3', '/abc']

//                    0    1           2                3         4
var REGEX_PARSE_ID = /^(?:@([^\/]+)\/)?((?:[^\/])+?)(?:@([^\/]+))?(\/.*)?$/;
// On android 2.2,
// `[^\/]+?` will fail to do the lazy match, but `(?:[^\/])+?` works.
// Shit, go to hell!

// Parses a module id into an object

// @param {string} id path-resolved module identifier
// 'a@1.0.0'    -> 'a@1.0.0'
// 'a'          -> 'a@*'
// 'a/inner'    -> 'a@*/inner'
function parse_module_id(id) {
  var match = id.match(REGEX_PARSE_ID);
  var scope = match[1];
  var _name = match[2];

  // 'a/inner' -> 'a@latest/inner'
  var version = match[3];
  var path = match[4];

  // There always be matches
  return {
    scope: scope,
    _name: _name,
    version: version,
    path: path
  };
}

function format(obj) {
  var version = obj.version ? '@' + obj.version : '';

  var path = obj.path || '';

  return obj.name + version + path;
}

var Pkg = function () {
  function Pkg(_ref) {
    var scope = _ref.scope;
    var _name = _ref._name;
    var version = _ref.version;
    var path = _ref.path;

    _classCallCheck(this, Pkg);

    this.scope = scope;
    this._name = _name;
    this.version = version;
    this.path = path;
  }

  _createClass(Pkg, [{
    key: 'name',
    get: function get() {
      var scope = this.scope ? '@' + this.scope + '/' : '';

      return scope + this._name;
    },
    set: function set(name) {
      var parsed = parse_module_id(name);
      this.scope = parsed.scope;
      this._name = parsed._name;
    }
  }, {
    key: 'id',
    get: function get() {
      return format(this);
    }
  }, {
    key: 'url',
    get: function get() {
      return [this.scope, this._name, this.version || '*'].filter(Boolean).join('/') + (this.path || '/' + this._name + '.js');
    }
  }, {
    key: 'pkg',
    get: function get() {
      return this.name + '@' + (this.version || '*');
    }
  }]);

  return Pkg;
}();