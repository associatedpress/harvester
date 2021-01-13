import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function NumberInput(props) {
  const {
    value,
    setField,
  } = props

  const val = (value || value === 0) ? value : ''
  const set = v => setField(v ? +v : null)

  return (
    <Input
      value={val}
      onChange={e => set(e.target.value)}
    />
  )
}

NumberInput.propTypes = {
  value: PropTypes.number,
  setField: PropTypes.func,
}

NumberInput.defaultProps = {}

export default NumberInput
