import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function StringInput(props) {
  const {
    value,
    setField,
  } = props

  return (
    <Input
      value={value || ''}
      onChange={e => setField(e.target.value)}
    />
  )
}

StringInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
}

StringInput.defaultProps = {
  value: '',
}

export default StringInput
