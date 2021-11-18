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
  validateField,
  validateForm,
  setError,
  setField,
  setSchema,
  setOptions,
  submitCreatedOptions
} from '../../actions/form'
import { API_SUCCESS, API_ERROR, apiRequest } from '../../actions/api'
import { setLoader, setFormDirty, setIndexLoaded, setFinished } from '../../actions/ui'
import { setNotification, setErrorNotification } from '../../actions/notification'
import { getFieldSchema, getFieldValue } from '../../selectors/form'
import { getUserEmail } from '../../selectors/user'
import validate from 'js/utils/validation'
import { serializeDateTime } from 'js/utils/datetime'

const schemaURL = form => `/${form.type}/${form.id}/schema`
const optionsURL = (form, range, opts = {}) => {
  const baseURL = `/${form.type}/${form.id}/table/${range}`
  const { requires, requireValue } = opts
  if (!requires) return baseURL
  const qs = new URLSearchParams({ [requires]: requireValue })
  return `${baseURL}?${qs}`
}
const loadIndexURL = (form, index) => {
  const qs = new URLSearchParams({ index })
  return `/${form.type}/${form.id}/current?${qs}`
}
const submitURL = (form, range) => {
  const baseURL = `/${form.type}/${form.id}/entry`
  if (!range) return baseURL
  const qs = new URLSearchParams({ range })
  return `${baseURL}?${qs}`
}

const parseDefault = (value, schema) => {
  if (value == null) return null
  if (schema.type === 'number') return +value
  if (schema.type === 'datetime' && value === 'today') return serializeDateTime(new Date(), schema.config)
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
  const { index } = state.form.schema
  const indexKeys = new Set(index.split('+'))
  const foundIndex = !!(action.payload.current && action.payload.current.data)
  const values = (action.payload.current && action.payload.current.data) || {}
  state.form.schema.columns.forEach(col => {
    const schema = getFieldSchema(state, col.id)
    const indexValue = values[col.id]
    const val = foundIndex ? indexValue : schema.config.default
    const value = parseDefault(val, schema)
    const isIndexField = indexKeys.has(col.config.key)
    if (!isIndexField) {
      store.dispatch(setField({ fieldId: col.id, value }))
    }
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
      next(setOptions({
        range: referrer.payload,
        fieldId: referrer.meta.fieldId,
        options: action.payload,
      }))
      break

    case SUBMIT:
      store.dispatch(clear())
      next([
        setNotification({ message: 'Form submission successful', feature: FORM }),
        setFinished({ state: true, feature: FORM }),
      ])
      break

    case LOAD_INDEX:
      handleLoadIndexResponse(store, next, action)
      break
  }
}

const handleApiError = (store, next, action) => {
  next([
    setErrorNotification({ message: action.payload.message, feature: FORM }),
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
  const url = optionsURL(state.form.form, action.payload, action.meta)
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
  next(apiRequest({
    body: JSON.stringify(action.payload.map(opt => [opt.value])),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: submitURL(state.form.form, action.meta.range),
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
      url: loadIndexURL(state.form.form, indexValue),
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
    return next(setErrorNotification({ message, feature: FORM }))
  }
  Object.entries(state.form.options.created).forEach(([range, options]) => {
    store.dispatch(submitCreatedOptions({ range, options }))
  })
  const row = state.form.schema.columns
    .map(col => getFieldValue(state, col.id))
  const now = new Date()
  const userEmail = getUserEmail(state) || 0
  next(apiRequest({
    body: JSON.stringify([[now, userEmail, ...row]]),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: submitURL(state.form.form),
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
