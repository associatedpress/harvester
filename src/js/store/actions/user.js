// features
export const AUTH = '[auth]'

// action types
export const SET_USER = 'SET_USER'

// action creators
export const setUser = ({ email, feature}) => ({
  type: `${feature || AUTH} ${SET_USER}`,
  payload: email,
  meta: { feature: feature || AUTH },
})
