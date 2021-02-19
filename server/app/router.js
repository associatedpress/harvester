const express = require('express')
const CSV = require('csv-string')
const google = require('./lib/google')
const logger = require('./logger')
const current = require('./lib/current')

const formIdParam = ':formId([a-zA-Z0-9-_]+)'
const HARVESTER_CONFIG_DOC_ID = process.env.HARVESTER_CONFIG_DOC_ID

const configure = ({ plugins }) => {
  const router = express.Router()

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

  const storePluginsByType = plugins.data.reduce((ps, plugin) => {
    return { ...ps, [plugin.formType]: plugin }
  }, {})
  const storePluginRoots = Object.keys(storePluginsByType)
  const formTypeParam = `:formType(${storePluginRoots.join('|')})`

  router.get(`/${formTypeParam}/${formIdParam}`, async (req, res) => {
    const { formType, formId } = req.params
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

  router.get(`/${formTypeParam}/${formIdParam}/schema`, async (req, res) => {
    try {
      const { formType, formId } = req.params
      const storePlugin = storePluginsByType[formType]
      const schema = await storePlugin.schema(formId)
      res.json(schema)
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  })

  router.get(`/${formTypeParam}/${formIdParam}/table/:table`, async (req, res) => {
    try {
      const { formType, formId, table } = req.params
      const storePlugin = storePluginsByType[formType]
      const data = await storePlugin.table(formId, table)
      res.json(data)
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  })

  router.post(`/${formTypeParam}/${formIdParam}/entry`, async (req, res) => {
    try {
      const { formType, formId } = req.params
      const { range } = req.query
      const rows = req.body
      const storePlugin = storePluginsByType[formType]
      await storePlugin.entry(formId, rows, { table: range })
      res.json({ rows: rows.length })
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  })

  router.get(`/${formTypeParam}/${formIdParam}/current`, async (req, res) => {
    try {
      const { formType, formId } = req.params
      const {
        history = 'false',
        index,
      } = req.query
      const storePlugin = storePluginsByType[formType]
      const currentValues = await storePlugin.current(
        formId,
        {
          index,
          history: /^true$/i.test(history),
        },
      )
      res.json(currentValues)
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  })

  router.get(`/${formTypeParam}/${formIdParam}/export.csv`, async (req, res) => {
    try {
      const { formType, formId } = req.params
      const headers = /^true$/i.test(req.query.headers)
      const storePlugin = storePluginsByType[formType]
      const rows = await storePlugin.exportCsv(formId, { headers })
      res.send(Buffer.from(CSV.stringify(rows)))
    } catch (error) {
      logger.error('Error:', error)
      res.status(500).json({ message: error.message })
    }
  })

  return router
}

module.exports = configure
