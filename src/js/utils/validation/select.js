import { parseValue } from 'js/utils/serialize'

function validateMin(value, min) {
  if (value.length < min) {
    return `select at least ${min} options`
  }
}

export default function validate(schema, value) {
  const {
    multiple,
    serialization,
    min
  } = schema.config

  const parsedValue = parseValue(value, { multiple, serialization })
  const errors = []

  if (min) errors.push(validateMin(parsedValue, min))

  return errors.filter(e => e)
}
