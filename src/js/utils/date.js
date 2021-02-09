export const formatDate = date => {
  if (!date) return null
  const year = date.format('YYYY')
  const month = date.format('MM')
  const day = date.format('DD')
  const hour = date.format('HH')
  const minute = date.format('mm')
  return `${month}/${day}/${year} ${hour}:${minute}`
}