// action types
export const SET_LOADER = 'SET_LOADER'
export const SET_SUBMITTING = 'SET_SUBMITTING'
export const SET_FORM_DIRTY = 'SET_FORM_DIRTY'
export const SET_FORM_READY = 'SET_FORM_READY'

// action creators
export const setLoader = ({ state, feature }) => ({
  type: `${feature} ${SET_LOADER}`,
  payload: state,
  meta: { feature },
})

export const setSubmitting = ({ state, feature }) => ({
  type: `${feature} ${SET_SUBMITTING}`,
  payload: state,
  meta: { feature },
})

export const setFormDirty = ({ state, feature }) => ({
  type: `${feature} ${SET_FORM_DIRTY}`,
  payload: state,
  meta: { feature },
})

export const setFormReady = ({ state, feature }) => ({
  type: `${feature} ${SET_FORM_READY}`,
  payload: state,
  meta: { feature },
})
