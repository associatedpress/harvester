import { SET_USER } from '../actions/user'

const initState = {
  email: null,
}

export const userReducer = (user = initState, action) => {
  switch (true) {
    case action.type.includes(SET_USER):
      return { ...user, email: action.payload }

    default:
      return user
  }
}
