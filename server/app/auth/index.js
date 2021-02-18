const express = require('express')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const google = require('../lib/google')
const parseSchema = require('../lib/schema')

const { JWT_SECRET } = process.env

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

function generateToken(auth, res) {
  const token = jwt.sign(auth, JWT_SECRET, { expiresIn: '1h' })
  res.cookie('token', token, {
    maxAge: 1 * 60 * 60 * 1000, // 1h
  })
}

const router = express.Router()
config.auth.plugins.forEach(plugin => {
  const authPlugin = require(plugin)
  const pluginRouter = express.Router()
  authPlugin.configure(pluginRouter, generateToken)
  router.use(`/${plugin}`, pluginRouter)
})

function pruneAuth(auth) {
  return auth // TODO
  const now = Date.now()
  return Object.entries(auth).reduce((newAuth, [key, value]) => {
    if (value.expires > now) {
      newAuth[key] = value
    }
    return newAuth
  }, {})
}

function auth(req, res, next) {
  const token = req.cookies.token || ''
  req.auth = {}
  if (!token) return next()
  try {
    const auth = verifyToken(token)
    req.auth = pruneAuth(auth)
  } catch(error) {
    console.error(error)
  }
  next()
}

function authenticate(schema, req, res) {
  const { auth } = schema
  const authPlugin = require(auth.type)
  authPlugin.authenticate(schema, req, res)
}

function verify(schema, req, res, next, error) {
  const { auth } = schema
  if (!auth) return next()
  const authPlugin = require(auth.type)
  authPlugin.verify(schema, req, res, next, error)
}

async function api(req, res, next) {
  const { docId } = req.params
  const range = 'schema'
  const data = await google.getRange(docId, { range, headers: false }) || []
  const schema = await parseSchema('d', docId, data)
  verify(schema, req, res, next, () => {
    res.status(401).json({ error: 'invalid credentials' })
  })
}

module.exports = {
  auth,
  api,
  router,
  authenticate,
  verify,
}
