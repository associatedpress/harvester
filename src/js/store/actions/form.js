// feature name
export const FORM = '[form]'

// action types
export const FETCH_SCHEMA = `${FORM} FETCH_SCHEMA`
export const SET_SCHEMA = `${FORM} SET_SCHEMA`
export const INPUT_FIELD = `${FORM} INPUT_FIELD`
export const SET_FIELD = `${FORM} SET_FIELD`
export const SET_ERROR = `${FORM} SET_ERROR`
export const VALIDATE_FIELD = `${FORM} VALIDATE_FIELD`
export const VALIDATE_FORM = `${FORM} VALIDATE_FORM`
export const FETCH_OPTIONS = `${FORM} FETCH_OPTIONS`
export const CREATE_OPTION = `${FORM} CREATE_OPTION`
export const SUBMIT_CREATED_OPTIONS = `${FORM} SUBMIT_CREATED_OPTIONS`
export const SET_OPTIONS = `${FORM} SET_OPTIONS`
export const LOAD_INDEX = `${FORM} LOAD_INDEX`
export const SUBMIT = `${FORM} SUBMIT`
export const CLEAR = `${FORM} CLEAR`

// action creators
export const fetchSchema = ({ type, id }) => ({
  type: FETCH_SCHEMA,
  payload: { type, id },
  meta: { feature: FORM },
})

export const setSchema = ({ schema }) => ({
  type: SET_SCHEMA,
  payload: schema,
  meta: { feature: FORM },
})

export const inputField = ({ fieldId, value }) => ({
  type: INPUT_FIELD,
  payload: value,
  meta: { fieldId, feature: FORM },
})

export const setField = ({ fieldId, value }) => ({
  type: SET_FIELD,
  payload: value,
  meta: { fieldId, feature: FORM },
})

export const setError = ({ fieldId, errors }) => ({
  type: SET_ERROR,
  payload: errors,
  meta: { fieldId, feature: FORM },
})

export const validateField = ({ fieldId }) => ({
  type: VALIDATE_FIELD,
  payload: fieldId,
  meta: { feature: FORM },
})

export const validateForm = () => ({
  type: VALIDATE_FORM,
  meta: { feature: FORM },
})

export const fetchOptions = ({ fieldId, range, requires, requireValue }) => ({
  type: FETCH_OPTIONS,
  payload: range,
  meta: { fieldId, requires, requireValue, feature: FORM },
})

export const createOption = ({ fieldId, option }) => ({
  type: CREATE_OPTION,
  payload: option,
  meta: { fieldId, feature: FORM },
})

export const submitCreatedOptions = ({ fieldId, options }) => ({
  type: SUBMIT_CREATED_OPTIONS,
  payload: options,
  meta: { fieldId, feature: FORM },
})

export const setOptions = ({ fieldId, options }) => ({
  type: SET_OPTIONS,
  payload: options,
  meta: { fieldId, feature: FORM },
})

export const loadIndex = () => ({
  type: LOAD_INDEX,
  meta: { feature: FORM },
})

export const submit = () => ({
  type: SUBMIT,
  meta: { feature: FORM },
})

export const clear = () => ({
  type: CLEAR,
  meta: { feature: FORM },
})
