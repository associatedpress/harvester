import {
  FORM,
  FETCH_SCHEMA,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  validateField,
  setSchema
} from '../../actions/schema'
import { API_SUCCESS, API_ERROR, apiRequest } from '../../actions/api'
import { setLoader } from '../../actions/ui'
import { setNotification } from '../../actions/notification'
import { setFormDirty } from '../../actions/ui'
import { getFieldSchema } from '../../selectors/schema'

const schemaURL = id => `http://localhost:8080/api/${id}/schema.json`

export const schemaMiddleware = () => next => action => {
  next(action)

  switch (action.type) {

    case FETCH_SCHEMA:
      next([
        apiRequest({ body: null, method: 'GET', url: schemaURL(action.payload), feature: FORM }),
        setLoader({ state: true, feature: FORM }),
      ])
      break

    case `${FORM} ${API_SUCCESS}`:
      next([
        setSchema({ schema: action.payload }),
        setLoader({ state: false, feature: FORM }),
      ])
      break

    case `${FORM} ${API_ERROR}`:
      next([
        setNotification({ message: action.payload.message, feature: FORM }),
        setLoader({ state: false, feature: FORM }),
      ])
      break

  }
}

export const validateMiddleware = ({ getState }) => next => action => {
  if (action.type === VALIDATE_FIELD) {
    const fieldId = action.payload
    const fieldSchema = getFieldSchema(getState(), fieldId)
    next(setError({ fieldId, errrors: validate(fieldSchema, action.payload) }))
  } else if (action.type === VALIDATE_FORM) {
    const state = getState()
    const { columns } = state.form.schema
    columns.forEach(col => next(validateField({ fieldId: col.id })))
  } else {
    next(action)
  }
}
