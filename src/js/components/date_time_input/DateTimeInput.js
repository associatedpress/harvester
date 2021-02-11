import React from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import { formatDate } from 'js/utils/date'
import './styles.scss'

function DateTimeInput(props) {
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
    <Datetime
      className='editable'
      selected={value && new Date(value)}
      onChange={change}
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
