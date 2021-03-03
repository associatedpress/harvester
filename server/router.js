const express = require('express')
const logger = require('./logger')
const harvesterAuth = require('./auth')
const harvesterStores = require('./stores')
const renderView = require('./render')
const harvesterVersion = require('../package.json').version

const configure = (config) => {
  const router = express.Router()

  const stores = harvesterStores.configure(config.store)
  const auth = harvesterAuth.configure(config.auth)

  router.use((req, res, next) => {
    req.harvesterLogo = config.logo
    req.harvesterVersion = harvesterVersion
    next()
  })

  router.use(auth.parseAuthCookie)
  router.use('/auth', auth.router)

  router.get('/', (req, res) => {
    renderView(req, res, { view: 'landing' })
  })

  router.use(stores.router(auth.verifyResourceAccessibility))

  router.use(auth.redirectErrorResponse)
  router.use(auth.apiErrorResponse)

  return router
}

module.exports = configure
