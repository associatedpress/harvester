const express = require('express')
const CSV = require('csv-string')
const router = express.Router()
const google = require('./lib/google')
const logger = require('./logger')
const parseSchema = require('./lib/schema')
const current = require('./lib/current')

const formIdParam = ':formId([a-zA-Z0-9-_]+)'
const HARVESTER_CONFIG_DOC_ID = process.env.HARVESTER_CONFIG_DOC_ID

router.get('/forms/:slug([a-zA-Z0-9-_]+)', async (req, res) => {
  if (HARVESTER_CONFIG_DOC_ID) {
    try {
      const { slug } = req.params
      const range = 'forms'
      const forms = await google.getRange(HARVESTER_CONFIG_DOC_ID, { range })
      const form = forms.find(f => f.slug === slug)
      if (form) {
        const formId = form.form_id
        const formType = form.form_type || 'd'
        res.render('formId', { formId, formType })
      } else {
        res.status(404).json({ message: `No form found with slug '${slug}'` })
      }
    } catch (error) {
      logger.error('Error from Google:', error)
      res.status(500).json({ message: error.message })
    }
  } else {
    const message = 'Custom form names not supported without Harvester config'
    res.status(401).json({ message })
  }
})

router.get(`/d/${formIdParam}`, async (req, res) => {
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
})

router.get(`/d/${formIdParam}/schema`, async (req, res) => {
  try {
    const { formId } = req.params
    const range = 'schema'
    const data = await google.getRange(formId, { range, headers: false }) || []
    const schema = await parseSchema('d', formId, data)
    res.json(schema)
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get(`/d/${formIdParam}/table/:table`, async (req, res) => {
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
})

router.post(`/d/${formIdParam}/entry`, async (req, res) => {
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
})

router.get(`/d/${formIdParam}/current`, async (req, res) => {
  try {
    const { formId } = req.params
    const {
      history = 'false',
      index,
    } = req.query
    const range = 'schema'
    const rawSchema = await google.getRange(formId, { range, headers: false }) || []
    const schema = await parseSchema('d', formId, rawSchema)
    const entries = await google.getRange(formId, { range: 'entry', headers: false }) || []
    const curr = current.current(schema, entries, { history: history.match(/^true$/i) })
    res.json(index ? (curr[index] || {}) : curr)
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get(`/d/${formIdParam}/export.csv`, async (req, res) => {
  try {
    const { formId } = req.params
    const {
      history = 'false',
      headers = 'true',
      index,
    } = req.query
    const range = 'schema'
    const rawSchema = await google.getRange(formId, { range, headers: false }) || []
    const schema = await parseSchema('d', formId, rawSchema)
    const entries = await google.getRange(formId, { range: 'entry', headers: false }) || []
    const curr = current.currentRows(schema, entries)
    const dataRows = (headers === 'true') ? curr : curr.slice(1)
    res.send(Buffer.from(CSV.stringify(dataRows)))
  } catch (error) {
    logger.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
