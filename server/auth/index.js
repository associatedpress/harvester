const express = require('express')
const jwt = require('jsonwebtoken')
const google = require('../stores/google-sheets/google')
const parseSchema = require('../stores/schema')

const configure = (config) => {
  const {
    secret,
    enabled = true,
    session = {},
    plugins = [],
  } = config

  const verifyToken = (token) => {
    return jwt.verify(token, secret)
  }

  const signToken = (payload, opts = {}) => {
    const { authenticationExpiresIn = '30d' } = session
    const tokenOpts = {
      expiresIn: authenticationExpiresIn,
      ...opts,
    }
    return jwt.sign(payload, secret, tokenOpts)
  }

  const setAuthCookie = (req, res, token) => {
    res.cookie('token', token, {
      httpOnly: true,
      secure: req.secure,
    })
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
      if (!enabled) return next()
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
    if (enabled && req.harvesterResource) {
      const { formType, formId } = req.harvesterResource
      const q = new URLSearchParams({ formType, formId })
      if (req.auth) {
        const opts = {
          status: 400,
          message: error.message,
          user: { email: req.auth.email },
          formType,
          formId,
        }
        return res.status(400).render('error', opts)
      }
      return res.redirect(`/auth/sign-in?${q}`)
    }
    return next(error)
  }

  const apiErrorResponse = (error, req, res, next) => {
    console.error(error)
    res.status(400).json({ message: error.message })
  }

  function resolveAuth(req, res, { form, data, options }) {
    const token = signToken(data, options)
    setAuthCookie(req, res, token)
    if (form.type && form.id) {
      return res.redirect(`/${form.type}/${form.id}`)
    }
    return res.redirect('/')
  }

  const router = express.Router()

  router.get('/sign-in', (req, res) => {
    const { formType, formId } = req.query
    const hasForm = formType && formId
    const q = hasForm && `?${new URLSearchParams({ formType, formId })}`
    if (!enabled) return res.redirect(hasForm ? `/${formType}/${formId}` : '/')
    const buttons = plugins.map(plugin => {
      const path = `/auth/${plugin.plugin.path}/sign-in${q}`
      const button = {
        ...(plugin.plugin.button || {}),
        ...(plugin.options.button || {}),
      }
      return {
        path,
        name: plugin.plugin.path,
        button,
      }
    })
    res.render('signIn', { formType, formId, buttons })
  })

  router.get('/sign-out', (req, res) => {
    const { formType, formId } = req.query
    const token = signToken({}, { expiresIn: 0 })
    setAuthCookie(req, res, token)
    if (formType && formId) {
      return res.redirect(`/${formType}/${formId}`)
    }
    return res.redirect('/')
  })

  plugins.forEach(plugin => {
    if (!enabled) return
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
