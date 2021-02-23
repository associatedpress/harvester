function validateLength(value, maxLength=80) {
  if (value) {
    const stringLength = value.length
    if ((stringLength) > maxLength) {
      return `String text must be ${maxLength} or fewer characters. This string is ${stringLength} characters.` 
    }
  }
}

function validateRegex(value, regex) {
  const re = new RegExp(`^${regex}\$`);
  if (!re.test(value)) {
      return `entry does not match specified pattern ${regex}`
  }
}
  
export default function validate(schema, value) {
  const {
    regex
  } = schema.config
  const valueLengthText = validateLength(value, schema.config.maxLength)

  const errors = []

  if (regex) errors.push(validateRegex(value, regex))
  if (valueLengthText) errors.push(valueLengthText)
  
  return errors.filter(e => e)
}