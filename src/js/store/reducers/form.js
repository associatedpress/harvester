import { combineReducers } from 'redux'
import { SET_SCHEMA, SET_FIELD, SET_ERROR } from '../actions/form'

const schemaReducer = (schema = {}, action) => {
  switch (action.type) {

    case SET_SCHEMA:
      return action.payload

    default:
      return schema
  }
}

const fieldValueReducer = (fields = {}, action) => {
  switch (action.type) {

    case SET_FIELD:
      return { ...fields, [action.meta.fieldId]: action.payload }

    default:
      return fields
  }
}

const fieldErrorReducer = (errors = {}, action) => {
  switch (action.type) {

    case SET_ERROR:
      return { ...errors, [action.meta.fieldId]: action.payload }

    default:
      return errors
  }
}

export const formReducer = combineReducers({
  schema: schemaReducer,
  fields: fieldValueReducer,
  errors: fieldErrorReducer,
})
