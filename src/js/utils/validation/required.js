export default function required(value) {
  if (!value && value !== 0) {
    return 'field is required'
  }
}
