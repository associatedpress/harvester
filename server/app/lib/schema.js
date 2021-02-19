const CSV = require('csv-string')
const google = require('./google')

function identity(x) {
  return x
}

function bool(b) {
  return b === 'true'
}

function number(n) {
  return +n
}

function parseDefault(value, type) {
  if (type === 'number') return number(value)
  return value
}

const universalOptions = {
  default: parseDefault, // default value for column
  help: identity, // help text for the column
  key: identity, // unique ID for the column
  required: bool, // whether or not the column is required
  relative: identity, // for relative columns
}
const allowedOptions = {
  date: {
    ...universalOptions,
    min: identity, // min viable date
    max: identity, // max viable date
  },
  number: {
    ...universalOptions,
  },
  string: {
    ...universalOptions,
  },
  text: {
    rows: number, // number of rows for the textarea
    ...universalOptions,
  },
  select: {
    ...universalOptions,
    creatable: bool, // whether or not new options can be added
    options: range => ({ range }), // sheet to pull select options from
    optionlist: opts => CSV.parse(opts)[0], // comma-separated list of options
    requires: identity, // column to parameterize async data request
    multiple: bool, // whether or not to allow multiple selections
    serialization: identity, // csv or json
    min: number, // min number of options that must be selected
    max: number, // Max number of options that may be selected
  },
  has_many: {
    ...universalOptions,
    serialization: identity, // csv or json
  },
}

function parseConfig(type, key, value, options) {
  const hasOptions = options.some(o => /^options:/.test(o))
  const hasOptionList = options.some(o => /^optionlist:/.test(o))

  if (hasOptions && hasOptionList) {
    throw new Error('schema error: `options` and `optionlist` cannot both be given')
  }

  const parser = allowedOptions[type][key]
  return parser(value, type)
}

function parseColumnSchema(schema, id) {
  const [label, type, ...options] = schema
  const allowed = allowedOptions[type]

  if (!allowed) {
    throw new Error(`schema error: unknown column type ${type}`)
  }

  const config = {}

  for (let c of options) {
    const [key, val] = c.split(/:(.+)/)

    if (!allowed[key]) {
      throw new Error(`schema error: column type ${type} cannot take option ${key}`)
    }

    config[key] = parseConfig(type, key, val, options)
  }

  return { id, label, type, config }
}

function parseRelativeColumnSchema(schema) {
  const type = schema[1]

  if (type === 'has_many') {
    throw new Error(`schema error: relative column must have primitive type`)
  }

  const config = parseColumnSchema(schema)
  const relative = config.config.relative

  if (!relative) {
    throw new Error('schema error: relative column must specify relative')
  }

  return { ...config, relative }
}

function parseSchema(type, form, configs) {
  const schema = {
    form: {
      type,
      id: form,
      path: `/${type}/${form}`,
    },
  }
  for (let config of configs) {
    const [configType, ...cfg] = config.filter(c => c)
    if (configType === 'column') {
      schema.columns = schema.columns || []
      const column = parseColumnSchema(cfg, schema.columns.length)
      schema.columns.push(column)
    } else if (configType === 'relative_column') {
      schema.relatives = schema.relatives || {}
      const column = parseRelativeColumnSchema(cfg)
      schema.relatives[column.relative] = schema.relatives[column.relative] || []
      const relativeCols = schema.relatives[column.relative]
      const id = relativeCols.length
      relativeCols.push({  ...column, id })
    } else {
      schema[configType.toLowerCase()] = cfg[0]
    }
  }
  return schema
}

module.exports = parseSchema
