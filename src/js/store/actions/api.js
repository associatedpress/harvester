// action types
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_ERROR = 'API_ERROR'

// action creators
export const apiRequest = ({ body, method, headers, url, referrer, feature }) => ({
  type: `${feature} ${API_REQUEST}`,
  payload: body,
  meta: { method, url, referrer, feature, headers },
})

export const apiSuccess = ({ status, response, referrer, feature }) => ({
  type: `${feature} ${API_SUCCESS}`,
  payload: response,
  meta: { status, referrer, feature },
})

export const apiError = ({ error, referrer, feature }) => ({
  type: `${feature} ${API_ERROR}`,
  payload: error,
  meta: { referrer, feature },
})
