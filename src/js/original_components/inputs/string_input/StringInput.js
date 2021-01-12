import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function StringInput(props) {
  const {
    value,
    onChange,
    readOnly,
  } = props

  let handler
  if (!readOnly) {
    handler = e => onChange(e.target.value)
  }

  return (
    <Input
      value={value || ''}
      readOnly={readOnly}
      onChange={handler}
    />
  )
}

StringInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
}

StringInput.defaultProps = {
  value: '',
  readOnly: false,
}

export default StringInput
