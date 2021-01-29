import { combineReducers } from 'redux'
import {
  CLEAR,
  FETCH_SCHEMA,
  SET_SCHEMA,
  SET_OPTIONS,
  CREATE_OPTION,
  SET_FIELD,
  SET_ERROR
} from '../actions/form'

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

    case CLEAR:
      return {}

    default:
      return fields
  }
}

const fieldErrorReducer = (errors = {}, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...errors, [action.meta.fieldId]: action.payload }

    case CLEAR:
      return {}

    default:
      return errors
  }
}

const loadedOptionsReducer = (options = {}, action) => {
  switch (action.type) {
    case SET_OPTIONS:
      return { ...options, [action.meta.fieldId]: action.payload }

    case CLEAR:
      return {}

    default:
      return options
  }
}

const createdOptionsReducer = (options = {}, action) => {
  switch (action.type) {
    case CREATE_OPTION:
      return {
        ...options,
        [action.meta.fieldId]: [...(options[action.meta.fieldId] || []), action.payload],
      }

    case CLEAR:
      return {}

    default:
      return options
  }
}

export const formReducer = combineReducers({
  id: formIdReducer,
  schema: schemaReducer,
  fields: fieldValueReducer,
  errors: fieldErrorReducer,
  options: combineReducers({
    loaded: loadedOptionsReducer,
    created: createdOptionsReducer,
  }),
})
