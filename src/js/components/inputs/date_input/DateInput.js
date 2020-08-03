import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const formatDate = date => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${month}/${day}/${year}`
}

function DateInput(props) {
  const {
    onChange,
    value,
    readOnly,
  } = props

  return (
    <DatePicker
      className={readOnly ? 'read-only' : 'editable'}
      selected={value && new Date(value)}
      readOnly={readOnly}
      onChange={d => onChange(formatDate(d))}
    />
  )
}

DateInput.propTypes = {
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
}

DateInput.defaultProps = {
  readOnly: false,
}

export default DateInput
