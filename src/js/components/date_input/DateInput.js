import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const formatDate = date => {
  if (!date) return null
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${month}/${day}/${year}`
}

function DateInput(props) {
  const {
    value,
    setField,
    validateField,
  } = props

  return (
    <DatePicker
      className='editable'
      selected={value && new Date(value)}
      onChange={d => setField(formatDate(d))}
      onBlur={validateField}
    />
  )
}

DateInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

DateInput.defaultProps = {}

export default DateInput
