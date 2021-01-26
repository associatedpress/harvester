import * as notification from '../notification'

const notificationState = notification => ({ notification })

describe('notification', () => {
  describe('getNotification', () => {
    it('should return notification array', () => {
      // GIVEN
      const notes = [{ id: 1, message: 'hello' }]
      const state = notificationState(notes)

      // WHEN
      const storedNotifications = notification.getNotifications(state)

      // THEN
      expect(storedNotifications).toEqual(notes)
    })
  })
})
