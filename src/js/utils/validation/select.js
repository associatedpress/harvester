import { parseValue } from 'js/utils/serialize'

function validateMin(value, min) {
  if (value.length < min) {
    return `select at least ${min} options`
  }
}

function validateMax(value, max) {
  if (value.length > max) {
    return `select no more than ${max} options`
  }
}

export default function validate(schema, value) {
  const {
    multiple,
    serialization,
    min,
    max,
  } = schema.config

  const parsedValue = parseValue(value, { multiple, serialization })
  const errors = []

  if (min) errors.push(validateMin(parsedValue, min))
  if (max) errors.push(validateMax(parsedValue, max))

  return errors.filter(e => e)
}
