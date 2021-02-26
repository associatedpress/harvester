require('dotenv').config()

const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const logger = require('./logger')
const router = require('./router')

const config = require('./config')

function loadConfig(cfg) {
  const loadPlugin = plugin => {
    const name = plugin.name || plugin
    const options = plugin.options || {}
    return {
      name,
      options,
      plugin: require(name).configure(options),
    }
  }
  const dataPlugins = cfg.store.plugins.map(loadPlugin)
  const authPlugins = cfg.auth.plugins.map(loadPlugin)

  return {
    ...cfg,
    store: {
      ...cfg.store,
      plugins: dataPlugins,
    },
    auth: {
      ...cfg.auth,
      plugins: authPlugins,
    },
  }
}

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

const start = (port = PORT, host = HOST) => {
  const app = express()

  app.use(helmet())

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))

  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(logger)

  app.use('/assets', createProxyMiddleware({
    target: 'https://interactives.ap.org',
    changeOrigin: true,
  }))

  // static front-end files served by webpack in development
  if (IS_PRODUCTION) {
    app.use(express.static('public'))
  }

  app.use(router(loadConfig(config)))

  app.listen(port, host, () => {
    console.log(`Express server listening at http://${host}:${port}`)
  })
}

if (!IS_PRODUCTION) {
  const portfinder = require('portfinder')
  portfinder.basePort = PORT
  portfinder.getPortPromise().then(start)
} else {
  start()
}
