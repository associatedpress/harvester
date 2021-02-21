const express = require('express')
const CSV = require('csv-string')
const logger = require('./logger')
const harvesterAuth = require('./auth')
const harvesterStores = require('./stores')

const configure = (config) => {
  const router = express.Router()

  const auth = harvesterAuth.configure(config.auth)
  router.use(auth.parseAuthCookie)
  router.use('/auth', auth.router)

  const stores = harvesterStores.configure({
    auth,
    ...config.store,
  })
  router.use(stores)

  return router
}

module.exports = configure
