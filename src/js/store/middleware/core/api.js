import { API_REQUEST, apiError, apiSuccess } from '../../actions/api'

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action)

  if (action.type.includes(API_REQUEST)) {
    const { body, url, method, headers, referrer, feature } = action.meta

    fetch(url, { body, method, headers })
      .then(response => Promise.all([response, response.json()]))
      .then(([status, response]) => {
        dispatch(apiSuccess({ status, response, referrer, feature }))
      })
      .catch(error => {
        console.error(error)
        dispatch(apiError({ error: error, referrer, feature }))
      })
  }
}
