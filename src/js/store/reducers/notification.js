import { REMOVE_NOTIFICATION, SET_NOTIFICATION } from '../actions/notification'

const initState = []

export const notificationsReducer = (notifications = initState, action) => {
  switch (true) {

    case action.type.includes(SET_NOTIFICATION):
      return [...notifications, action.payload];

    case action.type.includes(REMOVE_NOTIFICATION):
      return notifications.filter(notification => notification.id !== action.payload);

    default:
      return notifications;
  }
}
