const path = require('path')
const express = require('express')
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

const csp = cfg => {
  const directives = helmet.contentSecurityPolicy.getDefaultDirectives()
  const newDirectives = { ...directives }

  if (cfg.logo) {
    const logoUrl = new URL(config.logo)
    newDirectives['img-src'] = [...newDirectives['img-src'], logoUrl.hostname]
  }

  if (cfg.embed) {
    newDirectives['frame-ancestors'] = [
      ...newDirectives['frame-ancestors'],
      ...(cfg.embed.domains || []),
    ]
  }

  return newDirectives
}

const start = (port = PORT, host = HOST) => {
  const app = express()

  app.use(helmet({
    contentSecurityPolicy: {
      directives: csp(config)
    },
  }))

  app.set('trust proxy', config.trustProxy)
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))

  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(logger)

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
  const args = require('yargs').default('port', PORT).argv
  const portfinder = require('portfinder')
  portfinder.basePort = args.port
  portfinder.getPortPromise().then(start)
} else {
  start()
}
