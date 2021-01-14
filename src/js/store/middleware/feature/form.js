import {
  FORM,
  FETCH_OPTIONS,
  FETCH_SCHEMA,
  SET_FIELD,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  validateField,
  setError,
  setField,
  setSchema,
  setOptions
} from '../../actions/form'
import { API_SUCCESS, API_ERROR, apiRequest } from '../../actions/api'
import { setLoader, setFormDirty } from '../../actions/ui'
import { setNotification } from '../../actions/notification'
import { getFieldSchema, getFieldValue } from '../../selectors/form'
import validate from 'js/utils/validation'

const schemaURL = id => `/api/${id}/schema`
const optionsURL = (id, range) => `/api/${id}/sheet/${range}`

const handleApiSuccess = (store, next, action) => {
  const { referrer } = action.meta

  switch (referrer.type) {
    case FETCH_SCHEMA:
      next([
        setSchema({ schema: action.payload }),
        setLoader({ state: false, feature: FORM }),
      ].concat(action.payload.columns.map(col => {
        return setField({ fieldId: col.id, value: col.config.default || null })
      })))
      break

    case FETCH_OPTIONS:
      next(setOptions({ fieldId: referrer.meta.fieldId, options: action.payload }))
      break
  }
}

const handleApiError = (store, next, action) => {
  next([
    setNotification({ message: action.payload.message, feature: FORM }),
    setLoader({ state: false, feature: FORM }),
  ])
}

const handleFetchOptions = (store, next, action) => {
  const state = store.getState()
  const url = optionsURL(state.form.id, action.payload)
  next([
    apiRequest({
      body: null,
      method: 'GET',
      url: url,
      referrer: action,
      feature: FORM,
    }),
  ])
}

const handleValidateField = (store, next, action) => {
  const fieldId = action.payload
  const state = store.getState()
  const fieldSchema = getFieldSchema(state, fieldId)
  const fieldValue = getFieldValue(state, fieldId)
  next(setError({ fieldId, errors: validate(fieldSchema, fieldValue) }))
}

const handleValidateForm = (store, next, action) => {
  const state = store.getState()
  const { columns } = state.form.schema
  columns.forEach(col => next(validateField({ fieldId: col.id })))
}

export const formMiddleware = store => next => action => {
  next(action)

  switch (action.type) {
    case FETCH_SCHEMA:
      next([
        apiRequest({
          body: null,
          method: 'GET',
          url: schemaURL(action.payload),
          referrer: action,
          feature: FORM,
        }),
        setLoader({ state: true, feature: FORM }),
      ])
      break

    case `${FORM} ${API_SUCCESS}`:
      handleApiSuccess(store, next, action)
      break

    case `${FORM} ${API_ERROR}`:
      handleApiError(store, next, action)
      break

    case SET_FIELD:
      next([
        action,
        setFormDirty({ state: true, feature: FORM }),
      ])
      break

    case FETCH_OPTIONS:
      handleFetchOptions(store, next, action)
      break

    case VALIDATE_FIELD:
      handleValidateField(store, next, action)
      break

    case VALIDATE_FORM:
      handleValidateForm(store, next, action)
      break
  }
}
