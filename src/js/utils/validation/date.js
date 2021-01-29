function validateMin(value, min) {
  const minValue = (min === 'today') ? new Date() : new Date(min)
  if (value < minValue) {
    return `date must be at least ${min}`
  }
}

export default function validate(schema, value) {
  const {
    min,
  } = schema.config

  const parsedValue = value && new Date(value)
  const errors = []

  if (min) errors.push(validateMin(parsedValue, min))

  return errors.filter(e => e)
}
