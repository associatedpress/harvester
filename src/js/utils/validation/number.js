function validateMin(value, min) {
  if (value < min) {
    return `entry must be greater than ${min}`
  }
}

function validateMax(value, max) {
  if (value > max) {
    return `entry must be ${max} or less`
  }
}

export default function validate(schema, value) {
  const {
    min,
    max,
  } = schema.config

  const errors = []

  if (min) errors.push(validateMin(value, min))
  if (max) errors.push(validateMax(value, max))

  return errors.filter(e => e)
}