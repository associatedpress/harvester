import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function NumberInput(props) {
  const {
    onChange,
    value,
    readOnly,
  } = props

  return (
    <Input
      value={value}
      readOnly={readOnly}
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
  readOnly: PropTypes.bool,
}

NumberInput.defaultProps = {
  value: '',
  readOnly: false,
}

export default NumberInput
