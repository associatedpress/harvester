const CSV = require('csv-string')
const { marked } = require('marked')
const sanitizeHtml = require('sanitize-html')

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
  datetime: {
    ...universalOptions,
    min: identity, // min viable date
    max: identity, // max viable date
    time: bool, // enable/disable time input
    date: bool ,// enable/disable date input
  },
  number: {
    ...universalOptions,
    min: number,
    max: number,
  },
  string: {
    maxLength: number, //max extent of how many chars can be entered in the string
    regex: identity,
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

function parseColumnSchema(schema, id) {
  const [label, type, ...options] = schema
  const allowed = allowedOptions[type]

  if (!allowed) {
    throw new Error(`schema error: unknown column type ${type}`)
  }

  const config = {}

  for (let c of options) {
    const [key, val] = c.split(/:(.*)/)

    if (!allowed[key]) {
      throw new Error(`schema error: column type ${type} cannot take option ${key}`)
    }

    const parser = allowedOptions[type][key]
    config[key] = parser(val, type)
  }

  const column = { id, label, type, config }

  const relative = config.relative
  if (relative) return { ...column, relative }
  return column
}

function parseSchema(type, form, configs) {
  const schema = {
    form: {
      type,
      id: form,
      path: `/${type}/${form}`,
    },
    layout: [],
  }
  for (let config of configs) {
    const [configType, ...cfg] = config.filter(c => c)
    if (configType === 'column') {
      schema.columns = schema.columns || []
      const column = parseColumnSchema(cfg, schema.columns.length)
      schema.columns.push(column)
      schema.layout.push({ type: 'column', index: schema.columns.length - 1 })
    } else if (configType === 'relative_column') {
      schema.relatives = schema.relatives || {}
      const column = parseColumnSchema(cfg)
      if (!column.relative) {
        throw new Error(`schema error: relative_column ${column.label} does not specify relative`)
      }
      schema.relatives[column.relative] = schema.relatives[column.relative] || []
      const relativeCols = schema.relatives[column.relative]
      const id = relativeCols.length
      relativeCols.push({ ...column, id })
    } else if (configType === 'text') {
      const html = sanitizeHtml(marked(cfg[0] || ''))
      schema.layout.push({ type: 'text', html })
    } else if (configType === 'chatter') {
      const html = sanitizeHtml(marked(cfg[0] || ''))
      schema.chatter = html
    } else {
      schema[configType.toLowerCase()] = cfg[0]
    }
  }
  return schema
}

module.exports = parseSchema
