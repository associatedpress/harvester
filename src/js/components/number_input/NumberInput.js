import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function NumberInput(props) {
  const {
    value,
    setField,
  } = props

  return (
    <Input
      value={value}
      onChange={e => setField(e.target.value)}
    />
  )
}

NumberInput.propTypes = {
  value: PropTypes.number,
  setField: PropTypes.func,
}

NumberInput.defaultProps = {
  value: '',
}

export default NumberInput
