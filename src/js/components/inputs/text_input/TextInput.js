import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function TextInput(props) {
  const {
    value,
    onChange,
  } = props

  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  value: '',
}

export default TextInput
