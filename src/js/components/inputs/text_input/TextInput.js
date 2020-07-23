import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function TextInput(props) {
  const {
    value,
    rows,
    onChange,
  } = props

  return (
    <Input
      value={value}
      rows={rows}
      onChange={e => onChange(e.target.value)}
    />
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  value: '',
  rows: 2,
}

export default TextInput
