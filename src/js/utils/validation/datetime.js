import { parseDateTime } from 'js/utils/datetime'

function validateMin(value, min) {
  const minValue = parseDateTime(min)
  if (value < minValue) {
    return `date must be at least ${min}`
  }
}

function validateMax(value, max) {
  const maxValue = parseDateTime(max)
  if (value > maxValue) {
    return `date must be at most ${max}`
  }
}

export default function validate(schema, value) {
  const {
    min,
    max,
  } = schema.config

  const parsedValue = parseDateTime(value)
  const errors = []

  if (min) errors.push(validateMin(parsedValue, min))
  if (max) errors.push(validateMax(parsedValue, max))

  return errors.filter(e => e)
}
