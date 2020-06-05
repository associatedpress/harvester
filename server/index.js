const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const google = require('./google')

require('dotenv').config()

const app = express()
const hostname = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sheetId = process.env.SHEET_ID

const logger = function(req, res, next) {
  console.log(`[${new Date()}] ${req.method} ${req.originalUrl}`)
  next()
}

app.use(bodyParser.json())
app.use(logger)
app.use(express.static('public'))

app.use('/assets', createProxyMiddleware({
  target: 'https://interactives.ap.org',
  changeOrigin: true,
}))

app.get('/api/existing-charges', async (req, res) => {
  const range = 'entry!F:F'
  const data = await google.getRange(sheetId, { range, headers: false })
  const values = data.slice(1).reduce((p, d) => p.concat(d), [])
  const uniqueValues = Array.from(new Set(values))
  res.json(uniqueValues)
})

app.get('/api/sheet/:sheet', async (req, res) => {
  const range = req.params.sheet.toLowerCase()
  const data = await google.getRange(sheetId, { range })
  res.json(data)
})

app.post('/api/append-rows', (req, res) => {
  const rows = req.body
  const googleRsp = google.appendRows(sheetId, rows)
  res.json({ rows: rows.length })
})

app.listen(port, hostname, () => {
  console.log(`Express server listening at http://${hostname}:${port}`)
})
