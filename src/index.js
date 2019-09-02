// @const
// 'a@1.2.3/abc' ->
// ['a@1.2.3/abc', 'a', '1.2.3', '/abc']

//                    0    1           2                3         4
const REGEX_PARSE_ID = /^(?:@([^/]+)\/)?((?:[^/])+?)(?:@([^/]+))?(\/.*)?$/
// On android 2.2,
// `[^\/]+?` will fail to do the lazy match, but `(?:[^\/])+?` works.
// Shit, go to hell!

// Parses a module id into an object

// @param {string} id path-resolved module identifier
// 'a@1.0.0'    -> 'a@1.0.0'
// 'a'          -> 'a@*'
// 'a/inner'    -> 'a@*/inner'
function parse_module_id (id) {
  if (typeof id !== 'string') {
    const error = new TypeError(`id must be a string, but got \`${id}\``)
    error.code = 'INVALID_TYPE'
    throw error
  }

  const match = id.match(REGEX_PARSE_ID)

  if (!match) {
    const error = new RangeError(`"${id}" is not a valid module id`)
    error.code = 'INVALID_MODULE_ID'
    throw error
  }

  const scope = match[1]
  const _name = match[2]

  // 'a/inner' -> 'a@latest/inner'
  const version = match[3]
  const path = match[4]

  // There always be matches
  return {
    scope,
    _name,
    version,
    path
  }
}

function format (obj) {
  const version = obj.version
    ? `@${obj.version}`
    : ''

  const path = obj.path || ''

  return obj.name + version + path
}

class Pkg {
  constructor ({
    scope,
    _name,
    version,
    path

  }) {
    this.scope = scope
    this._name = _name
    this.version = version
    this.path = path
  }

  get name () {
    const scope = this.scope
      ? `@${this.scope}/`
      : ''

    return scope + this._name
  }

  set name (name) {
    const parsed = parse_module_id(name)
    this.scope = parsed.scope
    this._name = parsed._name
  }

  get id () {
    return format(this)
  }

  get url () {
    return [
      this.scope,
      this._name,
      this.version || '*'
    ]
    .filter(Boolean)
    .join('/')

    + (this.path || `/${this._name}.js`)
  }

  get pkg () {
    return `${this.name}@${this.version || '*'}`
  }
}

// @param {string} resolved path-resolved module identifier
const parse = id => new Pkg(parse_module_id(id))

module.exports = parse
parse.format = format
