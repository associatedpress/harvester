export const formatDate = date => {
  if (!date) return null
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${month}/${day}/${year}`
}

export const parseDate = date => {
  if (!date) return date
  if (date === 'today') return new Date()
  return new Date(date)
}
