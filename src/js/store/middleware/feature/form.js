import {
  FORM,
  FETCH_OPTIONS,
  SUBMIT_CREATED_OPTIONS,
  SET_SCHEMA,
  FETCH_SCHEMA,
  INPUT_FIELD,
  SET_FIELD,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  LOAD_INDEX,
  SUBMIT,
  CLEAR,
  clear,
  fetchSchema,
  validateField,
  validateForm,
  setError,
  setField,
  setSchema,
  setOptions,
  submitCreatedOptions
} from '../../actions/form'
import { API_SUCCESS, API_ERROR, apiRequest } from '../../actions/api'
import { setLoader, setFormDirty, setIndexLoaded } from '../../actions/ui'
import { setNotification } from '../../actions/notification'
import { getFieldSchema, getFieldValue } from '../../selectors/form'
import validate from 'js/utils/validation'
import { formatDate } from 'js/utils/date'

const schemaURL = id => `/api/${id}/schema`
const optionsURL = (id, range, opts = {}) => {
  const baseURL = `/api/${id}/sheet/${range}`
  const { requires, requireValue } = opts
  if (!requires) return baseURL
  const qs = new URLSearchParams({ [requires]: requireValue })
  return `${baseURL}?${qs}`
}
const loadIndexURL = (id, index) => {
  const qs = new URLSearchParams({ index })
  return `/api/${id}/current?${qs}`
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
  if (type === 'date' && value === 'today') return formatDate(new Date())
  return value
}

const handleSetSchema = (store, next, action) => {
  const schema = action.payload
  if (!schema.index) {
    next(setIndexLoaded({ state: true, feature: FORM }))
  }
}

const handleLoadIndexResponse = (store, next, action) => {
  const state = store.getState()
  const values = (action.payload.current && action.payload.current.data) || {}
  state.form.schema.columns.forEach(col => {
    const schema = getFieldSchema(state, col.id)
    const indexValue = values[col.id]
    const value =  (typeof indexValue === 'undefined') ? null : parseDefault(indexValue, schema.type)
    store.dispatch(setField({ fieldId: col.id, value }))
  })
  next(setIndexLoaded({ state: true, feature: FORM }))
}

const handleApiSuccess = (store, next, action) => {
  const { referrer } = action.meta

  switch (referrer.type) {
    case FETCH_SCHEMA:
      next(setLoader({ state: false, feature: FORM }))
      store.dispatch(setSchema({ schema: action.payload }))
      action.payload.columns.forEach(col => {
        store.dispatch(setField({ fieldId: col.id, value: parseDefault(col.config.default, col.type) }))
      })
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

    case LOAD_INDEX:
      handleLoadIndexResponse(store, next, action)
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

const handleSubmitCreatedOptions = (store, next, action) => {
  const state = store.getState()
  const schema = getFieldSchema(state, action.meta.fieldId)
  next(apiRequest({
    body: JSON.stringify([action.payload.map(opt => opt.value)]),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: submitURL(state.form.id, schema.config.options.range),
    referrer: action,
    feature: FORM,
  }))
}

const handleValidateField = (store, next, action) => {
  const fieldId = action.payload
  const state = store.getState()
  const schema = state.form.schema
  const fieldSchema = getFieldSchema(state, fieldId)
  const fieldValue = getFieldValue(state, fieldId)
  next(setError({ fieldId, errors: validate(fieldSchema, fieldValue, schema) }))
}

const handleValidateForm = (store) => {
  const state = store.getState()
  const { columns } = state.form.schema
  columns.forEach(col => store.dispatch(validateField({ fieldId: col.id })))
}

const handleLoadIndex = (store, next, action) => {
  const state = store.getState()
  const { index, columns } = state.form.schema
  const indexKeys = index.split('+')
  const indexFields = columns.reduce((cols, col) => {
    if (!indexKeys.includes(col.config.key)) return cols
    return { ...cols, [col.config.key]: col }
  }, {})
  const indexValue = indexKeys.map(k => state.form.fields[indexFields[k].id]).join('--')
  next([
    apiRequest({
      body: null,
      method: 'GET',
      url: loadIndexURL(state.form.id, indexValue),
      referrer: action,
      feature: FORM,
    }),
    setLoader({ state: true, feature: FORM }),
  ])
}

const handleSubmit = (store, next, action) => {
  store.dispatch(validateForm())
  const state = store.getState()
  if (Object.values(state.form.errors).some(e => e && (!Array.isArray(e) || e.length > 0))) {
    const message = 'Correct errors before submission'
    return next(setNotification({ message, feature: FORM }))
  }
  Object.entries(state.form.options.created).forEach(([fieldId, options]) => {
    store.dispatch(submitCreatedOptions({ fieldId, options }))
  })
  const row = state.form.schema.columns
    .map(col => getFieldValue(state, col.id))
  const now = new Date()
  next(apiRequest({
    body: JSON.stringify([[now, 0, ...row]]),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: submitURL(state.form.id),
    referrer: action,
    feature: FORM,
  }))
}

const handleClear = (store, next) => {
  const state = store.getState()
  const newIndexLoaded = !state.form.schema.index
  next([
    setFormDirty({ state: false, feature: FORM }),
    setIndexLoaded({ state: newIndexLoaded, feature: FORM }),
  ])
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

    case SET_SCHEMA:
      handleSetSchema(store, next, action)
      break

    case `${FORM} ${API_SUCCESS}`:
      handleApiSuccess(store, next, action)
      break

    case `${FORM} ${API_ERROR}`:
      handleApiError(store, next, action)
      break

    case INPUT_FIELD:
      store.dispatch(setField({ fieldId: action.meta.fieldId, value: action.payload }))
      next(setFormDirty({ state: true, feature: FORM }))
      break

    case SET_FIELD:
      handleSetField(store, next, action)
      break

    case FETCH_OPTIONS:
      handleFetchOptions(store, next, action)
      break

    case SUBMIT_CREATED_OPTIONS:
      handleSubmitCreatedOptions(store, next, action)
      break

    case VALIDATE_FIELD:
      handleValidateField(store, next, action)
      break

    case VALIDATE_FORM:
      handleValidateForm(store, next, action)
      break

    case LOAD_INDEX:
      handleLoadIndex(store, next, action)
      break

    case SUBMIT:
      handleSubmit(store, next, action)
      break

    case CLEAR:
      handleClear(store, next, action)
      break
  }
}
