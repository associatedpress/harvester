const express = require('express')
const logger = require('../logger')

const slugParam = ':slug([a-zA-Z0-9-_]+)'
const formIdParam = ':formId([a-zA-Z0-9-_]+)'

const configure = ({ config, plugins }) => {

  const storePluginsByType = plugins.reduce((ps, plugin) => {
    return { ...ps, [plugin.plugin.formType]: plugin.plugin }
  }, {})
  const storePluginRoots = Object.keys(storePluginsByType)
  const formTypeParam = `:formType(${storePluginRoots.join('|')})`

  const renderForm = async (formType, formId, req, res) => {
    const user = req.auth && { email: req.auth.email }
    res.render('formId', { formType, formId, user })
  }

  const setHarvesterResource = (opts = {}) => {
    const {
      api = true,
    } = opts
    return (req, res, next) => {
      const { formType, formId } = req.params
      req.harvesterResource = { formType, formId, api }
      next()
    }
  }

  const getCustomForm = async ({ slug, formId }) => {
    if (!config.id) return
    if (!slug && !formId) return
    const storePlugin = storePluginsByType[config.type]
    const forms = await storePlugin.table(config.id, 'forms')
    return forms.find(f => (!slug || f.slug === slug) && (!formId || f.form_id === formId))
  }

  const mount = (verify) => {
    const router = express.Router()
    const auth = verify(storePluginsByType)

    router.get(`/forms/${slugParam}`, async (req, res, next) => {
      try {
        const user = req.auth && { email: req.auth.email }
        const { slug } = req.params
        const customForm = await getCustomForm({ slug })
        if (customForm) {
          const formId = customForm.form_id
          const formType = customForm.form_type || config.type
          req.params.formType = formType
          req.params.formId = formId
          req.harvesterResource = { formType, formId, api: false }
          auth(req, res, async (error) => {
            if (error) return next(error)
            await renderForm(formType, formId, req, res)
          })
        } else {
          res.status(404).render('error', { user, status: 404, message: `No form found with slug '${slug}'` })
        }
      } catch (error) {
        logger.error('Error from store:', error)
        res.status(500).render('error', { user, status: 500, message: error.message })
      }
    })

    router.get(`/${formTypeParam}/${formIdParam}`, setHarvesterResource({ api: false }), auth, async (req, res) => {
      try {
        const { formType, formId } = req.params
        const customForm = await getCustomForm({ formId })
        if (customForm) {
          res.redirect(301, `/forms/${customForm.slug}`)
        } else {
          await renderForm(formType, formId, req, res)
        }
      } catch (error) {
        logger.error('Error:', error)
        const user = req.auth && { email: req.auth.email }
        res.status(500).render('error', { user, status: 500, message: error.message })
      }
    })

    router.get(`/${formTypeParam}/${formIdParam}/schema`, setHarvesterResource(), auth, async (req, res) => {
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

    router.get(`/${formTypeParam}/${formIdParam}/table/:table`, setHarvesterResource(), auth, async (req, res) => {
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

    router.post(`/${formTypeParam}/${formIdParam}/entry`, setHarvesterResource(), auth, async (req, res) => {
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

    router.get(`/${formTypeParam}/${formIdParam}/current`, setHarvesterResource(), auth, async (req, res) => {
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

    router.get(`/${formTypeParam}/${formIdParam}/export.csv`, setHarvesterResource(), auth, async (req, res) => {
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

  return {
    router: mount,
  }
}

module.exports = {
  configure,
}
