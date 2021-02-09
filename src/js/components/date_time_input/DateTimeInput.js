import React from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import { formatDate } from 'js/utils/date'
import './datetime.scss'

function DateTimeInput(props) {
  const {
    value,
    setField,
    validateField,
  } = props

  return (
    <Datetime
      className='editable'
      selected={value && new Date(value)}
      onChange={d => setField(formatDate(d))}
      onBlur={validateField}
    />
  )
}

DateTimeInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

DateTimeInput.defaultProps = {}

export default DateTimeInput
