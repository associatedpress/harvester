function validateRegex(value, regex) {
  let re = new RegExp(`^${regex}\$`);
  if (!re.test(value)) {
      return `entry does not match specified pattern ${regex}`
  }
}
  
export default function validate(schema, value) {
  const {
    regex
  } = schema.config

  const errors = []

  if (regex) errors.push(validateRegex(value, regex))
  
  return errors.filter(e => e)
}