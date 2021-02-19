const express = require('express')
const CSV = require('csv-string')
const google = require('./lib/google')
const logger = require('./logger')
const parseSchema = require('./lib/schema')
const current = require('./lib/current')

const formIdParam = ':formId([a-zA-Z0-9-_]+)'
const HARVESTER_CONFIG_DOC_ID = process.env.HARVESTER_CONFIG_DOC_ID

const configure = ({ plugins }) => {
  const router = express.Router()
  console.log(plugins)

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

  plugins.data.forEach(plugin => {
    const formType = plugin.formType
    router.get(`/${formType}/${formIdParam}`, plugin.get)
    router.get(`/${formType}/${formIdParam}/schema`, plugin.schema)
    router.get(`/${formType}/${formIdParam}/table/:table`, plugin.table)
    router.post(`/${formType}/${formIdParam}/entry`, plugin.entry)
    router.get(`/${formType}/${formIdParam}/current`, plugin.current)
    router.get(`/${formType}/${formIdParam}/export.csv`, plugin.exportCsv)
  })

  return router
}

module.exports = configure
