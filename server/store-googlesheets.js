const google = require('./app/lib/google')
const parseSchema = require('./app/lib/schema')
const currentIndex = require('./app/lib/current')
const logger = require('./app/logger')

const HARVESTER_CONFIG_DOC_ID = process.env.HARVESTER_CONFIG_DOC_ID
const formType = 'd'

const get = async (req, res) => {
  const { formId } = req.params
  const formType = 'd'
  if (HARVESTER_CONFIG_DOC_ID) {
    try {
      const range = 'forms'
      const forms = await google.getRange(HARVESTER_CONFIG_DOC_ID, { range })
      const form = forms.find(f => {
        const fType = f.form_type || 'd'
        return f.form_id === formId && fType === formType
      })
      if (form) {
        res.redirect(301, `/forms/${form.slug}`)
      } else {
        res.render('formId', { formType, formId })
      }
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  } else {
    res.render('formId', { formType, formId })
  }
}

const schema = async (req, res) => {
  try {
    const { formId } = req.params
    const range = 'schema'
    const data = await google.getRange(formId, { range, headers: false }) || []
    const schema = await parseSchema(formType, formId, data)
    res.json(schema)
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
}

const table = async (req, res) => {
  try {
    const { formId } = req.params
    const range = req.params.table
    const {
      headers = 'true',
      ...filters
    } = req.query
    const data = await google.getRange(
      formId,
      {
        headers: headers === 'true',
        range,
        filters,
      }
    )
    res.json(data)
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
}

const entry = async (req, res) => {
  try {
    const { formId } = req.params
    const { range = 'entry!A1' } = req.query
    const rows = req.body
    const googleRsp = await google.appendRows(formId, rows, { range })
    res.json({ rows: rows.length })
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
}

const current = async (req, res) => {
  try {
    const { formId } = req.params
    const {
      history = 'false',
      index,
    } = req.query
    const range = 'schema'
    const rawSchema = await google.getRange(formId, { range, headers: false }) || []
    const schema = await parseSchema(formType, formId, rawSchema)
    const entries = await google.getRange(formId, { range: 'entry', headers: false }) || []
    const curr = currentIndex.current(schema, entries, { history: history.match(/^true$/i) })
    res.json(index ? (curr[index] || {}) : curr)
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
}

const exportCsv = async (req, res) => {
  try {
    const { formId } = req.params
    const {
      history = 'false',
      headers = 'true',
      index,
    } = req.query
    const range = 'schema'
    const rawSchema = await google.getRange(formId, { range, headers: false }) || []
    const schema = await parseSchema(formType, formId, rawSchema)
    const entries = await google.getRange(formId, { range: 'entry', headers: false }) || []
    const curr = currentIndex.currentRows(schema, entries)
    const dataRows = (headers === 'true') ? curr : curr.slice(1)
    res.send(Buffer.from(CSV.stringify(dataRows)))
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  formType,
  get,
  schema,
  table,
  entry,
  current,
  exportCsv,
}
