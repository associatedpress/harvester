function validateMin(value, min) {
  if (value < min) {
    return `entry must be at least ${min}`
  }
}

function validateMax(value, max) {
  if (value > max) {
    return `entry must be at most ${max}`
  }
}

export default function validate(schema, value) {
  const {
    min,
    max,
  } = schema.config

  const errors = []

  if (min || min === 0 ) errors.push(validateMin(value, min))
  if (max || max === 0 ) errors.push(validateMax(value, max))

  return errors.filter(e => e)
}