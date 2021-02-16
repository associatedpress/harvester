export const serializeDateTime = (datetime, opts = {}) => {
  if (!datetime) return null
  const {
    date = true,
    time = true,
  } = opts

  const year = datetime.format('YYYY')
  const month = datetime.format('MM')
  const day = datetime.format('DD')
  const hour = datetime.format('HH')
  const minute = datetime.format('mm')

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
  if (date) return new Date(datetime)
  if (time) return new Date(`November 5, 1955 ${datetime}`)

  return new Date(datetime)
}
