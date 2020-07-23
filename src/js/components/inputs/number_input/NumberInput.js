import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function NumberInput(props) {
  const {
    onChange,
    value,
  } = props

  return (
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

NumberInput.defaultProps = {
  value: '',
}

export default NumberInput
