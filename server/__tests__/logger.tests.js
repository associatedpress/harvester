import logger from '../logger'

const now = 1614178202257
const pref = level => `${level} [${(new Date(now)).toISOString()}]`

describe('logger', () => {
  let mockConsoleDebug
  let mockConsoleLog
  let mockConsoleWarning
  let mockConsoleError

  beforeEach(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => now)
    mockConsoleDebug = jest.spyOn(global.console, 'debug').mockImplementation(() => {})
    mockConsoleLog = jest.spyOn(global.console, 'log').mockImplementation(() => {})
    mockConsoleWarning = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
    mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('logging functions', () => {
    it('calls console.debug on logger.debug', () => {
      // GIVEN
      const message = 'hello world'

      // WHEN
      logger.debug(message)

      // THEN
      expect(mockConsoleDebug).toHaveBeenCalledWith(pref('DEBUG'), message)
    })

    it('calls console.log on logger.info', () => {
      // GIVEN
      const message = 'hello world'

      // WHEN
      logger.info(message)

      // THEN
      expect(mockConsoleLog).toHaveBeenCalledWith(pref('INFO'), message)
    })

    it('calls console.warn on logger.warning', () => {
      // GIVEN
      const message = 'hello world'

      // WHEN
      logger.warning(message)

      // THEN
      expect(mockConsoleWarning).toHaveBeenCalledWith(pref('WARNING'), message)
    })

    it('calls console.error on logger.error', () => {
      // GIVEN
      const message = 'hello world'

      // WHEN
      logger.error(message)

      // THEN
      expect(mockConsoleError).toHaveBeenCalledWith(pref('ERROR'), message)
    })
  })

  describe('middleware', () => {
    it('should log request method and originalUrl at INFO level', () => {
      // GIVEN
      const req = {
        method: 'GET',
        originalUrl: '/hello/world',
      }
      const next = jest.fn()

      // WHEN
      logger(req, {}, next)

      // THEN
      expect(mockConsoleLog).toHaveBeenCalledWith(pref('INFO'), `${req.method} ${req.originalUrl}`)
      expect(next).toHaveBeenCalled()
    })
  })
})
