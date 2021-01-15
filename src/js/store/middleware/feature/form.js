import {
  FORM,
  FETCH_OPTIONS,
  FETCH_SCHEMA,
  SET_FIELD,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  SUBMIT,
  CLEAR,
  clear,
  fetchSchema,
  validateField,
  validateForm,
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
const optionsURL = (id, range, opts = {}) => {
  const baseURL = `/api/${id}/sheet/${range}`
  const { requires, requireValue } = opts
  if (!requires) return baseURL
  const qs = new URLSearchParams({ [requires]: requireValue })
  return `${baseURL}?${qs}`
}
const submitURL = (id, range) => {
  const baseURL = `/api/${id}/entry`
  if (!range) return baseURL
  const qs = new URLSearchParams({ range })
  return `${baseURL}?${qs}`
}

const parseDefault = (value, type) => {
  if (value == null) return null
  if (type === 'number') return +value
  return value
}

const handleApiSuccess = (store, next, action) => {
  const { referrer } = action.meta

  switch (referrer.type) {
    case FETCH_SCHEMA:
      next([
        setSchema({ schema: action.payload }),
        setLoader({ state: false, feature: FORM }),
      ].concat(action.payload.columns.map(col => {
        return setField({ fieldId: col.id, value: parseDefault(col.config.default, col.type) })
      })))
      break

    case FETCH_OPTIONS:
      next(setOptions({ fieldId: referrer.meta.fieldId, options: action.payload }))
      break

    case SUBMIT:
      store.dispatch(clear())
      next([
        setNotification({ message: 'Form submission successful', feature: FORM }),
        fetchSchema({ id: store.getState().form.id }),
      ])
      break
  }
}

const handleApiError = (store, next, action) => {
  next([
    setNotification({ message: action.payload.message, feature: FORM }),
    setLoader({ state: false, feature: FORM }),
  ])
}

const handleSetField = (store, next, action) => {
  const state = store.getState()
  const fieldSchema = getFieldSchema(state, action.meta.fieldId)
  const key = fieldSchema.config.key
  const requirers = state.form.schema.columns.filter(col => key && col.config.requires === key)
  next([
    setFormDirty({ state: true, feature: FORM }),
    ...requirers.map(col => setField({ fieldId: col.id, value: null })),
  ])
}

const handleFetchOptions = (store, next, action) => {
  const state = store.getState()
  const url = optionsURL(state.form.id, action.payload, action.meta)
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
  columns.forEach(col => store.dispatch(validateField({ fieldId: col.id })))
}

const handleSubmit = (store, next, action) => {
  store.dispatch(validateForm())
  const state = store.getState()
  if (Object.values(state.form.errors).some(e => e.length)) {
    const message = 'Correct errors before submission'
    return next(setNotification({ message, feature: FORM }))
  }
  next(Object.entries(state.form.options.created).map(([fieldId, options]) => {
    const schema = getFieldSchema(state, fieldId)
    return apiRequest({
      body: JSON.stringify([options.map(opt => opt.value)]),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      url: submitURL(state.form.id, schema.config.options.range),
      referrer: action,
      feature: FORM,
    })
  }))
  const row = state.form.schema.columns
    .map(col => col.id)
    .sort()
    .map(fieldId => getFieldValue(state, fieldId))
  const now = new Date()
  next(apiRequest({
    body: JSON.stringify([[now, ...row]]),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: submitURL(state.form.id),
    referrer: action,
    feature: FORM,
  }))
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
      handleSetField(store, next, action)
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

    case SUBMIT:
      handleSubmit(store, next, action)
      break

    case CLEAR:
      next(setFormDirty({ state: false, feature: FORM }))
      break
  }
}
