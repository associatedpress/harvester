import * as notification from '../notification'

describe('notification', () => {
  describe('setNotification', () => {
    it(`should create a ${notification.SET_NOTIFICATION} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = notification.setNotification(options)

      // THEN
      expect(action.type).toMatch(new RegExp(notification.SET_NOTIFICATION))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = notification.setNotification(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${notification.SET_NOTIFICATION}`)
    })

    it('should include the message as the action payload', () => {
      // GIVEN
      const options = {
        message: 'hello world',
      }

      // WHEN
      const action = notification.setNotification(options)

      // THEN
      expect(action.payload).toEqual(options.message)
    })

    it('should include the duration in the action meta', () => {
      // GIVEN
      const options = {
        duration: 10000,
      }

      // WHEN
      const action = notification.setNotification(options)

      // THEN
      expect(action.meta.duration).toEqual(options.duration)
    })


    it('should include default message type', () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = notification.setNotification(options)

      // THEN
      expect(action.meta.messageType).toEqual('confirmation')
    })
  })

  describe('setErrorNotification', () => {
    it(`should include an error message type`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = notification.setErrorNotification(options)

      // THEN
      expect(action.meta.messageType).toEqual('error')
    })
  })

  describe('removeNotification', () => {
    it(`should create a ${notification.REMOVE_NOTIFICATION} action`, () => {
      // GIVEN
      const options = {}

      // WHEN
      const action = notification.removeNotification(options)

      // THEN
      expect(action.type).toMatch(new RegExp(notification.REMOVE_NOTIFICATION))
    })

    it('should include the feature in the action type', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = notification.removeNotification(options)

      // THEN
      expect(action.type).toEqual(`${options.feature} ${notification.REMOVE_NOTIFICATION}`)
    })

    it('should include the notificationId as the action payload', () => {
      // GIVEN
      const options = {
        notificationId: 12345,
      }

      // WHEN
      const action = notification.removeNotification(options)

      // THEN
      expect(action.payload).toEqual(options.notificationId)
    })

    it('should include the feature in the action meta', () => {
      // GIVEN
      const options = {
        feature: '[feature]',
      }

      // WHEN
      const action = notification.removeNotification(options)

      // THEN
      expect(action.meta.feature).toEqual(options.feature)
    })
  })
})
