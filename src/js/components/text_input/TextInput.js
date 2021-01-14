import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function TextInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
  } = props

  const {
    rows = 2,
  } = schema.config

  return (
    <Input
      value={value || ''}
      rows={rows}
      onChange={e => setField(e.target.value || null)}
      onBlur={validateField}
    />
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

TextInput.defaultProps = {
  value: '',
}

export default TextInput
