import { combineReducers } from 'redux'
import { FETCH_SCHEMA, SET_SCHEMA, SET_OPTIONS, SET_FIELD, SET_ERROR } from '../actions/form'

const formIdReducer = (formId = null, action) => {
  switch (action.type) {
    case FETCH_SCHEMA:
      return action.payload

    default:
      return formId
  }
}

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

const optionsReducer = (options = {}, action) => {
  switch (action.type) {
    case SET_OPTIONS:
      return { ...options, [action.meta.fieldId]: action.payload }

    default:
      return options
  }
}

export const formReducer = combineReducers({
  id: formIdReducer,
  schema: schemaReducer,
  fields: fieldValueReducer,
  errors: fieldErrorReducer,
  options: optionsReducer,
})
