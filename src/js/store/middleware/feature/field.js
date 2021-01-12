import { FIELD, SET_FIELD } from '../../actions/field'
import { setFormDirty } from '../../actions/ui'
import { getFieldSchema } from '../../selectors/schema'
import validate from '../../../utils/validation'

// This middleware should encode the business logic of validating fields and
// then either settitng them in the state tree if valid or setting an error if
// not. That means we'll need to have access to the schema of the field we're
// setting and the value we're trying to set it to. The schema will let us know
// the type and any validations wee need to apply (required, max value, etc.).
// We could either include the schema in the action or query the schema from
// the state in this middleware. The latter is probably the better choice
// because it will allow us to keep the external interface of setting a field
// as simple as possible (i.e., `setField({ fieldId, value })`). That means
// we'll need a selector to grab a field's schema by field ID.

export const fieldMiddleware = ({ getState }) => next => action => {
  if (action.type === SET_FIELD) {
    const { meta } = action
    const state = getState()
    const fieldSchema = getFieldSchema(state.schema, meta.fieldId)
    next([
      { ...action, payload: validate(fieldSchema, action.payload) },
      setFormDirty({ state: true, feature: FIELD }),
    ])
  } else {
    next(action)
  }
}
