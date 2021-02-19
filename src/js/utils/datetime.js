export const serializeDateTime = (datetime, opts = {}) => {
  if (!datetime) return null
  const {
    date = true,
    time = true,
  } = opts

  const year = datetime.getFullYear()
  const month = (datetime.getMonth() + 1).toString().padStart(2, '0')
  const day = datetime.getDate().toString().padStart(2, '0')
  const hour = datetime.getHours().toString().padStart(2, '0')
  const minute = datetime.getMinutes().toString().padStart(2, '0')

  const formattedDate = date && `${month}/${day}/${year}` 
  const formattedTime = time && `${hour}:${minute}`

  return [formattedDate, formattedTime].filter(x => x).join(' ')

}

export const parseDateTime = (datetime, opts = {}) => {
  const {
    date = true,
    time = true,
  } = opts

  if (!datetime) return datetime
  if (datetime === 'today') return new Date()
  if (!date) return new Date(`1955-11-05 ${datetime}`)

  return new Date(datetime)
}
