import * as notification from '../notification'
import * as actions from '../../actions/notification'

describe('notification', () => {
  describe('notificationsReducer', () => {
    describe('initial state', () => {
      // WHEN
      const initial = notification.notificationsReducer(undefined, { type: '@@INIT' })

      it('should start as an empty array', () => {
        // THEN
        expect(initial).toEqual([])
      })
    })

    describe('action response SET_NOTIFICATION', () => {
      it('should append a notification object', () => {
        // GIVEN
        const initial = notification.notificationsReducer(undefined, { type: '@@INIT' })
        const message = { id: 1, message: 'hello' }
        const action = actions.setNotification({ message })

        // WHEN
        const newState = notification.notificationsReducer(initial, action)

        // THEN
        expect(newState).toEqual([...initial, message])
      })
    })

    describe('action response REMOVE_NOTIFICATION', () => {
      it('should append a notification object', () => {
        // GIVEN
        const message = { id: 1, message: 'hello' }
        const initial = notification.notificationsReducer([message], { type: '@@INIT' })
        const action = actions.removeNotification({ notificationId: message.id })

        // WHEN
        const newState = notification.notificationsReducer(initial, action)

        // THEN
        expect(newState).toEqual([])
      })
    })
  })
})
