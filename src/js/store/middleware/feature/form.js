import { compose } from 'redux'
import {
  FORM,
  FETCH_SCHEMA,
  SET_SCHEMA,
  SET_FIELD,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  validateField,
  setError,
  setField,
  setSchema
} from '../../actions/form'
import { API_SUCCESS, API_ERROR, apiRequest } from '../../actions/api'
import { setLoader, setFormDirty } from '../../actions/ui'
import { setNotification } from '../../actions/notification'
import { getFieldSchema, getFieldValue } from '../../selectors/form'
import validate from 'js/utils/validation'

const schemaURL = id => `/api/${id}/schema`

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
      ].concat(action.payload.columns.map(col => {
        return setField({ fieldId: col.id, value: col.config.default || null })
      })))
      break

    case `${FORM} ${API_ERROR}`:
      next([
        setNotification({ message: action.payload.message, feature: FORM }),
        setLoader({ state: false, feature: FORM }),
      ])
      break
  }
}

export const fieldMiddleware = ({ getState }) => next => action => {
  if (action.type === SET_FIELD) {
    next([
      action,
      setFormDirty({ state: true, feature: FORM }),
    ])
  } else if (action.type === VALIDATE_FIELD) {
    const fieldId = action.payload
    const state = getState()
    const fieldSchema = getFieldSchema(state, fieldId)
    const fieldValue = getFieldValue(state, fieldId)
    next(setError({ fieldId, errors: validate(fieldSchema, fieldValue) }))
  } else if (action.type === VALIDATE_FORM) {
    const state = getState()
    const { columns } = state.form.schema
    columns.forEach(col => next(validateField({ fieldId: col.id })))
  } else {
    next(action)
  }
}
