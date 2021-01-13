import * as CSV from 'csv-string'

export function parseValue(value, opts = {}) {
  const {
    multiple = false,
    serialization = 'json',
  } = opts
  if (!multiple) return value
  const parsers = {
    csv: v => CSV.parse(v)[0],
    json: JSON.parse,
  }
  const fn = parsers[serialization] || parsers.json
  return value ? fn(value) : []
}

export function serializeValue(value, opts = {}) {
  const {
    multiple = false,
    serialization = 'json',
  } = opts
  if (!multiple) return value
  const serializers = {
    csv: CSV.stringify,
    json: JSON.stringify,
  }
  const fn = serializers[serialization] || serializers.json
  return value && fn(value).trim()
}
