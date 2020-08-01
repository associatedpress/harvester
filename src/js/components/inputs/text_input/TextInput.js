import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function TextInput(props) {
  const {
    value,
    rows,
    readOnly,
    onChange,
  } = props

  return (
    <Input
      value={value}
      rows={rows}
      readOnly={readOnly}
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
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  value: '',
  rows: 2,
  readOnly: false,
}

export default TextInput
