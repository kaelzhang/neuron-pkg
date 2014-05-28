'use strict';

module.exports = parse;
parse.format = format;

var semver = require('semver');

var REGEX_PARSE_ID = /^((?:[^\/])+?)(?:@([^\/]+))?(\/.*)?$/;
// On android 2.2,
// `[^\/]+?` will fail to do the lazy match, but `(?:[^\/]+?)` works.
// Shit, go to hell!

// @param {string} resolved path-resolved module identifier
function parse (id) {
  var match = id.match(REGEX_PARSE_ID);
  var name = match[1];

  // 'a/inner' -> 'a@latest/inner'
  var version = match[2]
  var path = match[3] || '';
  var range;

  if (version) {
    if (!semver.valid(version)) {
      range = version;
      version = undefined;
    }
  }

  // There always be matches
  return {
    name: name,
    version: version,
    range: range,
    path: path
  };
};


function format (obj) {
  var version = obj.version || obj.range;

  return obj.name + (
    version
      ? '@' + version
      : ''
  ) + obj.path;
}