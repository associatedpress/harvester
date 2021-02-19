import { parseDateTime } from 'js/utils/datetime'

function validateMin(value, min, opts) {
  const minValue = parseDateTime(min, opts)
  if (value < minValue) {
    return `date must be at least ${min}`
  }
}

function validateMax(value, max, opts) {
  const maxValue = parseDateTime(max, opts)
  if (value > maxValue) {
    return `date must be at most ${max}`
  }
}

export default function validate(schema, value) {
  const {
    min,
    max,
    date,
    time,
  } = schema.config
  const opts = { date, time }

  const parsedValue = parseDateTime(value, opts)
  const errors = []

  if (min) errors.push(validateMin(parsedValue, min, opts))
  if (max) errors.push(validateMax(parsedValue, max, opts))

  return errors.filter(e => e)
}
