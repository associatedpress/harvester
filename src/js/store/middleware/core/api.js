import { API_REQUEST, apiError, apiSuccess } from '../../actions/api'

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action)

  if (action.type.includes(API_REQUEST)) {
    const body = action.payload
    const { url, method, headers, referrer, feature } = action.meta

    fetch(url, { body, method, headers })
      .then(async (response) => {
        let data
        try {
          data = await response.json()
        } catch(error) {
          console.error(error)
          return dispatch(apiError({ error, referrer, feature }))
        }
        if (!response.ok) {
          return dispatch(apiError({ error: data, referrer, feature }))
        }
        return dispatch(apiSuccess({
          status: response.status,
          response: data,
          referrer,
          feature,
        }))
      })
  }
}
