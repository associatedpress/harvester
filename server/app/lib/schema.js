const CSV = require('csv-string')
const google = require('./google')

const universalOptions = [
  'default', // default value for column
  'help', // help text for the column
  'key', // unique ID for the column
  'required', // whether or not the column is required
  'relative', // for relative columns
]
const allowedOptions = {
  date: new Set([
    ...universalOptions,
    'min', // min viable date
    'max', // max viable date
  ]),
  number: new Set([
    ...universalOptions,
  ]),
  string: new Set([
    ...universalOptions,
  ]),
  text: new Set([
    'rows', // number of rows for the textarea
    ...universalOptions,
  ]),
  select: new Set([
    ...universalOptions,
    'creatable', // whether or not new options can be added
    'options', // sheet to pull select options from
    'optionlist', // comma-separated list of options
    'requires', // column to parameterize async data request
    'multiple', // whether or not to allow multiple selections
    'serialization', // csv or json
  ]),
  has_many: new Set([
    ...universalOptions,
    'serialization', // csv or json
  ]),
}

function parseConfig(type, key, value, options) {
  const hasOptions = options.some(o => /^options:/.test(o))
  const hasOptionList = options.some(o => /^optionlist:/.test(o))

  if (hasOptions && hasOptionList) {
    throw new Error('schema error: `options` and `optionlist` cannot both be given')
  }

  const parseDefault = (type, value) => {
    if (type === 'number') return +value
    return value
  }

  switch (key) {
    case 'default':
      return parseDefault(type, value)
    case 'options':
      return {
        range: value,
      }
    case 'optionlist':
      return CSV.parse(value)[0]
    case 'creatable':
      return value === 'true'
    case 'multiple':
      return value === 'true'
    case 'rows':
      return +value
    default:
      return value
  }
}

function parseColumnSchema(schema, id) {
  const [label, type, ...options] = schema
  const allowed = allowedOptions[type]

  if (!allowed) {
    throw new Error(`schema error: unknown column type ${type}`)
  }

  const config = {}

  for (let c of options) {
    const [key, val] = c.split(':')

    if (!allowed.has(key)) {
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

function parseSchema(configs) {
  const schema = {}
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
