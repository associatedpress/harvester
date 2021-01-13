import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function TextInput(props) {
  const {
    value,
    setField,
    validateField,
    rows,
  } = props

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
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

TextInput.defaultProps = {
  value: '',
  rows: 2,
}

export default TextInput
