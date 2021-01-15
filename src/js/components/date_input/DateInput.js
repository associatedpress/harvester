import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDate } from 'js/utils/date'

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
