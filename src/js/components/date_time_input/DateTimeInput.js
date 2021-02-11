import React from 'react'
import PropTypes from 'prop-types'
import Datetime from 'react-datetime'
import { formatDate } from 'js/utils/date'
import './styles.scss'

function DateTimeInput(props) {
  const {
    schema,
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
      timeFormat={schema.config.time}
      dateFormat={schema.config.date}
      className='editable'
      selected={value && new Date(value)}
      onChange={change}
    />
  )
}

DateTimeInput.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

DateTimeInput.defaultProps = {}

export default DateTimeInput
