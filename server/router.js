const express = require('express')
const logger = require('./logger')
const harvesterAuth = require('./auth')
const harvesterStores = require('./stores')

const configure = (config) => {
  const router = express.Router()

  const stores = harvesterStores.configure(config.store)
  const auth = harvesterAuth.configure(config.auth)

  router.use(auth.parseAuthCookie)
  router.use('/auth', auth.router)

  router.get('/', (req, res) => {
    const user = req.auth && { email: req.auth.email }
    res.render('landing', { user })
  })

  router.use(stores.router(auth.verifyResourceAccessibility))

  router.use(auth.redirectErrorResponse)
  router.use(auth.apiErrorResponse)

  return router
}

module.exports = configure
