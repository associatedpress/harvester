const express = require('express')
const jwt = require('jsonwebtoken')
const google = require('../stores/google-sheets/google')
const parseSchema = require('../stores/schema')

const configure = ({ secret, plugins }) => {
  const verifyToken = (token) => {
    return jwt.verify(token, secret)
  }

  const signToken = (payload, opts = {}) => {
    return jwt.sign(payload, secret, opts)
  }

  const parseAuthCookie = (req, res, next) => {
    const token = req.cookies.token || ''
    if (!token) return next()
    try {
      req.auth = verifyToken(token)
    } catch(error) {
      console.error(error)
    }
    next()
  }

  const verifyResourceAccessibility = (storePluginsByType) => {
    return async (req, res, next) => {
      const { formType, formId } = req.params
      const storePlugin = storePluginsByType[formType]
      const auth = req.auth
      const userCanAccess = await storePlugin.userCanAccess(formId, auth)
      if (userCanAccess) return next()
      next(new Error(`unauthorized access to resource ${formType}/${formId}`))
    }
  }

  const redirectErrorResponse = (error, req, res, next) => {
    console.error(error)
    console.log({ harvester: req.harvesterResource })
    if (req.harvesterResource) {
      const { formType, formId } = req.harvesterResource
      const q = new URLSearchParams({ formType, formId })
      if (req.auth) return res.status(400).render('error', { status: 400, message: error.message })
      return res.redirect(`/auth/sign-in?${q}`)
    }
    return next(error)
  }

  const apiErrorResponse = (error, req, res, next) => {
    console.error(error)
    res.status(400).json({ message: error.message })
  }

  function authenticate(schema, req, res) {
    const { auth } = schema
    const authPlugin = require(auth.type)
    authPlugin.authenticate(schema, req, res)
  }

  function resolveAuth(req, res, { form, data, options }) {
    const token = signToken(data, options)
    res.cookie('token', token, {
      httpOnly: true,
      // secure: NODE_ENV === 'production',
    })
    res.redirect(`/${form.type}/${form.id}`)
  }

  const router = express.Router()

  router.get('/sign-in', (req, res) => {
    const { formType, formId } = req.query
    const q = new URLSearchParams({ formType, formId })
    const buttons = plugins.map(plugin => {
      const path = `/auth/${plugin.plugin.path}/sign-in?${q}`
      const button = {
        ...(plugin.plugin.button || {}),
        ...(plugin.options.button || {}),
      }
      console.log(plugin)
      return {
        path,
        name: plugin.plugin.path,
        button,
      }
    })
    res.render('signIn', { formType, formId, buttons })
  })

  plugins.forEach(plugin => {
    const pluginRouter = express.Router()
    const deps = {
      router: pluginRouter,
      resolve: resolveAuth,
      token: {
        verify: verifyToken,
        sign: signToken,
      },
    }
    router.use(`/${plugin.plugin.path}`, plugin.plugin.mount(deps))
  })

  return {
    parseAuthCookie,
    verifyResourceAccessibility,
    redirectErrorResponse,
    apiErrorResponse,
    router,
  }
}

module.exports = {
  configure,
}
