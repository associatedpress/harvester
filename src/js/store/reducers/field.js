import { SET_FIELD } from '../actions/field'

const initState = {}

export const fieldReducer = (fields = initState, action) => {
  switch (action.type) {

    case SET_FIELD:
      return { ...fields, [action.meta.fieldId]: action.payload }

    default:
      return fields
  }
}
