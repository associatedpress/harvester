export const FIELD = '[field]'

export const SET_FIELD = `${FIELD} SET`

export const setField = ({ fieldId, value }) => ({
  type: SET_FIELD,
  payload: value,
  meta: { fieldId, feature: FIELD },
})
