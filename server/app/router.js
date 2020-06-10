const express = require('express')
const router = express.Router()
const google = require('./lib/google')
const logger = require('./logger')
const parseSchema = require('./lib/schema')

const docIdParam = ':docId([a-zA-Z0-9-_]+)'

router.get(`/d/${docIdParam}`, (req, res) => {
  const { docId } = req.params
  res.render('docId', { docId })
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

router.get(`/api/${docIdParam}/existing-charges`, async (req, res) => {
  const range = 'entry!F:F'
  try {
    const { docId } = req.params
    const data = await google.getRange(docId, { range, headers: false })
    const values = data.slice(1).reduce((p, d) => p.concat(d), [])
    const uniqueValues = Array.from(new Set(values))
    res.json(uniqueValues)
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

router.get(`/api/${docIdParam}/sheet/:sheet`, async (req, res) => {
  try {
    const { docId } = req.params
    const range = req.params.sheet.toLowerCase()
    const data = await google.getRange(docId, { range })
    res.json(data)
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

router.post(`/api/${docIdParam}/sheet/:sheet`, async (req, res) => {
  try {
    const { docId } = req.params
    const rows = req.body
    const googleRsp = await google.appendRows(docId, rows)
    res.json({ rows: rows.length })
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

router.post(`/api/${docIdParam}/entry`, async (req, res) => {
  try {
    const { docId } = req.params
    const rows = req.body
    const googleRsp = await google.appendRows(docId, rows)
    res.json({ rows: rows.length })
  } catch (error) {
    logger.error('Error from Google:', error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
