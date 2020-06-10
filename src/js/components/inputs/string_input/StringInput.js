import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function StringInput(props) {
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

StringInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

StringInput.defaultProps = {
  value: '',
}

export default StringInput
