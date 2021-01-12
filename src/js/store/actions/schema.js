// feature name
export const SCHEMA = '[schema]'

// action types
export const FETCH_SCHEMA = `${SCHEMA} FETCH`
export const SET_SCHEMA   = `${SCHEMA} SET`

// action creators
export const fetchSchema = ({ id }) => ({
  type: FETCH_SCHEMA,
  payload: id,
})

export const setSchema = ({ schema }) => ({
  type: SET_SCHEMA,
  payload: schema,
  meta: { feature: SCHEMA },
})
