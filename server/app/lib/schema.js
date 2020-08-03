const CSV = require('csv-string')
const google = require('./google')

const universalOptions = [
  'default', // default value for column
  'global', // whether or not column is global
  'help', // help text for the column
  'key', // unique ID for the column
  'required', // whether or not the column is required
  'search',
]
const allowedOptions = {
  date: new Set([
    ...universalOptions,
  ]),
  bool: new Set([
    ...universalOptions,
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
}

async function resolveOptions(docId, range) {
  const options = await google.getRange(docId, { range })
  return options.map(opt => ({ value: opt.value, label: opt.label }))
}

async function parseConfig(docId, type, key, value, options) {
  const requires = options.some(o => /^requires:/.test(o))
  const hasOptions = options.some(o => /^options:/.test(o))
  const hasOptionList = options.some(o => /^optionlist:/.test(o))

  if (hasOptions && hasOptionList) {
    throw new Error('schema error: `options` and `optionlist` cannot both be given')
  }

  switch (key) {
    case 'global':
      return value === 'true'
    case 'default':
      return (type === 'bool') ? (value === 'true') : value
    case 'options':
      return {
        range: value,
        options: requires ? [] : await resolveOptions(docId, value),
      }
    case 'optionlist':
      return CSV.parse(value)[0]
    case 'creatable':
      return value === 'true'
    case 'multiple':
      return value === 'true'
    case 'search':
      return value === 'true'
    default:
      return value
  }
}

async function parseColumnSchema(docId, schema, id) {
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

    config[key] = await parseConfig(docId, type, key, val, options)
  }

  return { id, label, type, config }
}

async function parseSchema(docId, configs) {
  const schema = {}
  for (let config of configs) {
    const [configType, ...cfg] = config.filter(c => c)
    if (configType === 'column') {
      schema.columns = schema.columns || []
      const column = await parseColumnSchema(docId, cfg, schema.columns.length)
      schema.columns.push(column)
    } else {
      schema[configType.toLowerCase()] = cfg[0]
    }
  }
  return schema
}

module.exports = parseSchema
