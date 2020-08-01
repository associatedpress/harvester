const express = require('express')
const router = express.Router()
const google = require('./lib/google')
const logger = require('./logger')
const parseSchema = require('./lib/schema')

const docIdParam = ':docId([a-zA-Z0-9-_]+)'
const HARVESTER_CONFIG_DOC_ID = process.env.HARVESTER_CONFIG_DOC_ID

router.get('/forms/:slug([a-zA-Z0-9-_]+)', async (req, res) => {
  if (HARVESTER_CONFIG_DOC_ID) {
    try {
      const { slug } = req.params
      const range = 'forms'
      const forms = await google.getRange(HARVESTER_CONFIG_DOC_ID, { range })
      const form = forms.find(f => f.slug === slug)
      if (form) {
        const docId = form.doc_id
        res.render('docId', { docId })
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

router.get(`/d/${docIdParam}`, async (req, res) => {
  const { docId } = req.params
  if (HARVESTER_CONFIG_DOC_ID) {
    try {
      const range = 'forms'
      const forms = await google.getRange(HARVESTER_CONFIG_DOC_ID, { range })
      const form = forms.find(f => f.doc_id === docId)
      if (form) {
        res.redirect(301, `/forms/${form.slug}`)
      } else {
        res.render('docId', { docId })
      }
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  } else {
    res.render('docId', { docId })
  }
})

router.get(`/api/${docIdParam}/schema`, async (req, res) => {
  try {
    const { docId } = req.params
    const range = 'schema'
    const data = await google.getRange(docId, { range, headers: false }) || []
    const schema = await parseSchema(docId, data)
    res.json(schema)
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get(`/api/${docIdParam}/sheet/:sheet`, async (req, res) => {
  try {
    const { docId } = req.params
    const range = req.params.sheet.toLowerCase()
    const {
      headers = 'true',
      ...filters
    } = req.query
    const data = await google.getRange(
      docId,
      {
        headers: headers === 'true',
        range,
        filters,
      }
    )
    res.json(data)
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

router.post(`/api/${docIdParam}/entry`, async (req, res) => {
  try {
    const { docId } = req.params
    const { range = 'entry!A1' } = req.query
    const rows = req.body
    const googleRsp = await google.appendRows(docId, rows, { range })
    res.json({ rows: rows.length })
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
