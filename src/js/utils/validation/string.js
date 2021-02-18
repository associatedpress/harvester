function validateLength(value) {
  if (value !== null) {
    const maxLength= 70
    const stringLength = value.length
    if (maxLength < stringLength) {
      return `String text must be fewer than 100 characters. This string is ` + stringLength + ' characters.' 
    }
  }
}

export default function validate(schema, value) {
  const valueLengthText = validateLength(value)
  const errors = []

  if (valueLengthText) errors.push(valueLengthText)

  return errors.filter(e => e)
}