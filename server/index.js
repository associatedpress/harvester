require('dotenv').config()

const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

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

  app.use((req, res, next) => {
    require('./app/logger')(req, res, next)
  })

  app.use((req, res, next) => {
    require('./app/router')(req, res, next)
  })

  // static
  if (!IS_PRODUCTION) {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackConfigFn = require('../webpack-dev.config.js')
    const config = webpackConfigFn(undefined, undefined, port)

    config.entry = ['webpack-hot-middleware/client?reload=true&timeout=1000', config.entry]
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    const compiler = webpack(config)
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }))
    app.use(webpackHotMiddleware(compiler))
  } else {
    app.use(express.static('public'))
  }

  app.use('/assets', createProxyMiddleware({
    target: 'https://interactives.ap.org',
    changeOrigin: true,
  }))

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
