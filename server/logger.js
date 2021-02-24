const DEBUG = 0
const INFO = 1
const WARNING = 2
const ERROR = 3

function log(level, ...msg) {
  const levelLabels = ['DEBUG', 'INFO', 'WARNING', 'ERROR']
  const levelFns = [console.debug, console.log, console.warn, console.error]
  const pref = `${levelLabels[level]} [${new Date(Date.now()).toISOString()}]`
  const fn = levelFns[level]
  fn(pref, ...msg)
}

function debug(...msg) {
  log(DEBUG, ...msg)
}

function info(...msg) {
  log(INFO, ...msg)
}

function warning(...msg) {
  log(WARNING, ...msg)
}

function error(...msg) {
  log(ERROR, ...msg)
}

function logger(req, res, next) {
  log(INFO, `${req.method} ${req.originalUrl}`)
  next()
}

logger.debug = debug
logger.info = info
logger.warning = warning
logger.error = error

module.exports = logger
