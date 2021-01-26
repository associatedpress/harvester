import * as api from '../api'

describe('api', () => {
  describe('apiRequest', () => {
    it(`should create a ${api.API_REQUEST} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.type).toMatch(new RegExp(api.API_REQUEST))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${api.API_REQUEST}`)
    })

    it('should include the body as the action payload', () => {
      // GIVEN
      const options = {
        body: JSON.stringify({ foo: 'bar' }),
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.payload).toEqual(options.body)
    })

    it('should include the method in the action meta', () => {
      // GIVEN
      const options = {
        method: 'POST',
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.meta.method).toEqual(options.method)
    })

    it('should include headers in the action meta', () => {
      // GIVEN
      const options = {
        headers: { foo: 'bar' },
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.meta.headers).toEqual(options.headers)
    })

    it('should include the URL in the action meta', () => {
      // GIVEN
      const options = {
        url: 'https://www.foo.com',
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.meta.url).toEqual(options.url)
    })

    it('should include the referrer action in the action meta', () => {
      // GIVEN
      const options = {
        referrer: { type: 'SOME_ACTION' },
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.meta.referrer).toEqual(options.referrer)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = api.apiRequest(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })

  describe('apiSuccess', () => {
    it(`should create a ${api.API_SUCCESS} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = api.apiSuccess(options)

      // THEN
      expect(action.type).toMatch(new RegExp(api.API_SUCCESS))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = api.apiSuccess(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${api.API_SUCCESS}`)
    })

    it('should include the response data as the action payload', () => {
      // GIVEN
      const options = {
        response: { foo: 'bar' },
      }

      // WHEN
      const action = api.apiSuccess(options)

      // THEN
      expect(action.payload).toEqual(options.response)
    })

    it('should include the response status in the action meta', () => {
      // GIVEN
      const options = {
        status: 200,
      }

      // WHEN
      const action = api.apiSuccess(options)

      // THEN
      expect(action.meta.status).toEqual(options.status)
    })

    it('should include the referrer action in the action meta', () => {
      // GIVEN
      const options = {
        referrer: { type: 'SOME_ACTION' },
      }

      // WHEN
      const action = api.apiSuccess(options)

      // THEN
      expect(action.meta.referrer).toEqual(options.referrer)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = api.apiSuccess(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })

  describe('apiError', () => {
    it(`should create a ${api.API_ERROR} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = api.apiError(options)

      // THEN
      expect(action.type).toMatch(new RegExp(api.API_ERROR))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = api.apiError(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${api.API_ERROR}`)
    })

    it('should include the error as the action payload', () => {
      // GIVEN
      const options = {
        error: 'no data found',
      }

      // WHEN
      const action = api.apiError(options)

      // THEN
      expect(action.payload).toEqual(options.error)
    })

    it('should include the referrer action in the action meta', () => {
      // GIVEN
      const options = {
        referrer: { type: 'SOME_ACTION' },
      }

      // WHEN
      const action = api.apiError(options)

      // THEN
      expect(action.meta.referrer).toEqual(options.referrer)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = api.apiError(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })
})
