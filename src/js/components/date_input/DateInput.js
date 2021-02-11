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

  const change = d => {
    setField(formatDate(d))
    validateField()
  }

  return (
    <DatePicker
      className='editable'
      selected={value && new Date(value)}
      onChange={change}
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
