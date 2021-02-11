jest.useFakeTimers()

import * as notification from '../notification'
import * as actions from '../../../actions/notification'

describe('notification', () => {
  describe('notifactionMiddleware', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('ignores irrelelvant actions', () => {
      // GIVEN
      const next = jest.fn()
      const action = { type: '@@INIT' }

      // WHEN
      notification.notificationMiddleware()(next)(action)

      // THEN
      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0]).toBe(action)
    })

    it('enriches a SET_NOTIFICATION action payload', () => {
      // GIVEN
      const next = jest.fn()
      const action = actions.setNotification({ message: 'hello', feature: '[feature]' })

      // WHEN
      notification.notificationMiddleware()(next)(action)

      // THEN
      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0].type).toEqual(action.type)
      expect(next.mock.calls[0][0].payload.message).toEqual(action.payload)
      expect(next.mock.calls[0][0].payload.messageType).toEqual('confirmation')
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000)

      // AFTER
      jest.runAllTimers()

      expect(next.mock.calls.length).toBe(2)
      expect(next.mock.calls[1][0].type).toEqual(`${action.meta.feature} ${actions.REMOVE_NOTIFICATION}`)
      expect(next.mock.calls[1][0].payload).toEqual(next.mock.calls[0][0].payload.id)
    })

    it('use SET_NOTIFICATION meta duration for timeout duration', () => {
      // GIVEN
      const next = jest.fn()
      const duration = 8888
      const action = actions.setNotification({ message: 'hello', feature: '[feature]', duration })

      // WHEN
      notification.notificationMiddleware()(next)(action)

      // THEN
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), duration)
    })
  })
})
