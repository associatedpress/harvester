const google = require('./app/lib/google')
const currentIndex = require('./app/lib/current')
const parseSchema = require('./app/lib/schema')
const logger = require('./app/logger')

const HARVESTER_CONFIG_DOC_ID = process.env.HARVESTER_CONFIG_DOC_ID
const formType = 'd'

const schema = async (formId) => {
  const range = 'schema'
  const data = await google.getRange(formId, { range, headers: false }) || []
  return await parseSchema(formType, formId, data)
}

const table = async (formId, range, opts = {}) => {
  const {
    headers = true,
    ...filters
  } = opts
  const data = await google.getRange(
    formId,
    {
      headers,
      range,
      filters,
    }
  )
  return data
}

const entry = async (formId, rows, opts = {}) => {
  const {
    table = 'entry!A1',
  } = opts
  await google.appendRows(formId, rows, { range: table })
}

const current = async (formId, opts = {}) => {
  const {
    index,
    history,
  } = opts
  const formSchema = await schema(formId)
  const entries = await google.getRange(formId, { range: 'entry', headers: false }) || []
  const curr = currentIndex.current(formSchema, entries, { history })
  return index ? (curr[index] || {}) : curr
}

const exportCsv = async (formId, opts = {}) => {
  const {
    headers = true,
  } = opts
  const formSchema = await schema(formId)
  const entries = await google.getRange(formId, { range: 'entry', headers: false }) || []
  const curr = currentIndex.currentRows(formSchema, entries)
  return headers ? curr : curr.slice(1)
}

module.exports = {
  formType,
  schema,
  table,
  entry,
  current,
  exportCsv,
}
