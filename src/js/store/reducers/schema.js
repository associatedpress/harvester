import { SET_SCHEMA } from '../actions/schema'

const initState = {}

export const schemaReducer = (schema = initState, action) => {
  switch (action.type) {

    case SET_SCHEMA:
      return action.payload

    default:
      return schema
  }
}
