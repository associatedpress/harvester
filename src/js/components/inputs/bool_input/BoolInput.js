import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function BoolInput(props) {
  const {
    onChange,
    value,
  } = props

  return (
    <Input
      checked={value}
      onChange={e => onChange(e.target.checked)}
    />
  )
}

BoolInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
}

BoolInput.defaultProps = {
  value: false,
}

export default BoolInput
