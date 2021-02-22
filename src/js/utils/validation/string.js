function validateLength(value, maxLength) {
  if (value) {
    const stringLength = value.length
    if ((stringLength) > maxLength) {
      return `String text must be ${maxLength} or fewer characters. This string is ${stringLength} characters.` 
    }
  }
}

export default function validate(schema, value) {
  const valueLengthText = validateLength(value, schema.config.maxLength)
  const errors = []

  if (valueLengthText) errors.push(valueLengthText)

  return errors
}