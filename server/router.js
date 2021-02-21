const express = require('express')
const CSV = require('csv-string')
const logger = require('./logger')

const slugParam = ':slug([a-zA-Z0-9-_]+)'
const formIdParam = ':formId([a-zA-Z0-9-_]+)'

const {
  HARVESTER_CONFIG_RESOURCE_TYPE = 'd',
  HARVESTER_CONFIG_RESOURCE_ID,
} = process.env

const configure = ({ plugins }) => {
  const router = express.Router()

  const storePluginsByType = plugins.data.reduce((ps, plugin) => {
    return { ...ps, [plugin.formType]: plugin }
  }, {})
  const storePluginRoots = Object.keys(storePluginsByType)
  const formTypeParam = `:formType(${storePluginRoots.join('|')})`

  const getCustomForm = async ({ slug, formId }) => {
    if (!HARVESTER_CONFIG_RESOURCE_ID) return
    if (!slug && !formId) return
    const storePlugin = storePluginsByType[HARVESTER_CONFIG_RESOURCE_TYPE]
    const forms = await storePlugin.table(HARVESTER_CONFIG_RESOURCE_ID, 'forms')
    return forms.find(f => (!slug || f.slug === slug) && (!formId || f.form_id === formId))
  }

  router.get(`/forms/${slugParam}`, async (req, res) => {
    try {
      const { slug } = req.params
      const customForm = await getCustomForm({ slug })
      if (customForm) {
        const formId = form.form_id
        const formType = form.form_type || HARVESTER_CONFIG_RESOURCE_TYPE
        res.render('formId', { formId, formType })
      } else {
        // TODO: real 4xx page
        res.status(404).json({ message: `No form found with slug '${slug}'` })
      }
    } catch (error) {
      logger.error('Error from store:', error)
      // TODO: real 5xx page
      res.status(500).json({ message: error.message })
    }
  })

  router.get(`/${formTypeParam}/${formIdParam}`, async (req, res) => {
    try {
      const { formType, formId } = req.params
      const customForm = await getCustomForm({ formId })
      if (customForm) {
        res.redirect(301, `/forms/${form.slug}`)
      } else {
        res.render('formId', { formType, formId })
      }
    } catch (error) {
      logger.error('Error:', error)
      // TODO: real 5xx page
      res.status(500).json({ message: error.message })
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
