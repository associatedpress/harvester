import { SCHEMA, FETCH_SCHEMA, setSchema } from '../../actions/schema'
import { API_SUCCESS, API_ERROR, apiRequest } from '../../actions/api'
import { setLoader } from '../../actions/ui'
import { setNotification } from '../../actions/notification'

const schemaURL = id => `http://localhost:8080/api/${id}/schema.json`

export const schemaMiddleware = () => next => action => {
  next(action)

  switch (action.type) {

    case FETCH_SCHEMA:
      next([
        apiRequest({ body: null, method: 'GET', url: schemaURL(action.payload), feature: SCHEMA }),
        setLoader({ state: true, feature: SCHEMA }),
      ])
      break;

    case `${SCHEMA} ${API_SUCCESS}`:
      next([
        setSchema({ schema: action.payload }),
        setLoader({ state: false, feature: SCHEMA }),
      ])
      break;

    case `${SCHEMA} ${API_ERROR}`:
      next([
        setNotification({ message: action.payload.message, feature: SCHEMA }),
        setLoader({ state: false, feature: SCHEMA }),
      ])
      break;

  }
}
