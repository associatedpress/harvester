import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function StringInput(props) {
  const {
    value,
    setField,
    validateField,
  } = props


  //create function for string length validation

  return (
    <Input
      value={value || ''}
      onChange={e => setField(e.target.value || null)}
      onBlur={validateField}
    />
  )
}

StringInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

StringInput.defaultProps = {
  value: '',
}

export default StringInput
