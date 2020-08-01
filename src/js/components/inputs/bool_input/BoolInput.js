import React from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function BoolInput(props) {
  const {
    onChange,
    value,
    readOnly,
  } = props

  const val = (typeof value === 'string')
    ? value.match(/^true$/i)
    : value

  let handler
  if (!readOnly) {
    handler = e => onChange(e.target.checked)
  }

  return (
    <Input
      checked={val}
      readOnly={readOnly}
      onChange={handler}
    />
  )
}

BoolInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  readOnly: PropTypes.bool,
}

BoolInput.defaultProps = {
  value: false,
  readOnly: false,
}

export default BoolInput
