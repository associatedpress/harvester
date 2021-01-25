export default function required(value) {
  if (value == null) {
    return 'field is required'
  }
}
