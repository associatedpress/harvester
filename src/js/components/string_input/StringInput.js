import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function StringInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
  } = props

  return (
    <Input
      value={value || ''}
      onChange={e => setField(e.target.value || null)}
      onBlur={validateField}
    />
  )
}

StringInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

StringInput.defaultProps = {
  value: '',
  schema: PropTypes.object,
}

export default StringInput
