import { parseValue } from 'js/utils/serialize'
import { validatePrimitive } from './index'

export default function validate(schema, value, formSchema) {
  const {
    relative,
    serialization,
  } = schema.config

  const columns = formSchema.relatives[relative]
  const parsedValue = parseValue(value, { multiple: true, serialization })

  const errors = parsedValue.reduce((rels, relative, i) => {
    const relErrs = columns.reduce((errs, col, i) => {
      const relativeValue = relative[i]
      const fieldErrors = validatePrimitive(col, relativeValue, formSchema)
      if (fieldErrors && fieldErrors.length > 0) {
        errs[col.id] = fieldErrors
      }
      return errs
    }, {})

    const relFieldsWithErrors = Object.keys(relErrs)
    if (relFieldsWithErrors.length > 0) {
      rels[i] = relErrs
    }
    return rels
  }, {})

  const relativesWithErrors = Object.keys(errors)
  if (relativesWithErrors.length > 0) return errors
}
