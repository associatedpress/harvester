import React from 'react'
import PropTypes from 'prop-types'
import { TypedInput } from 'js/components/inputs'
import { GlobalContainer, Label, Error } from './styles'

function Global(props) {
  const {
    schema,
    value,
    error,
    onChange,
  } = props

  const { type, label, config } = schema

  return (
    <GlobalContainer>
      <Label>{label}</Label>
      <TypedInput
        type={type}
        value={value}
        onChange={onChange}
        {...config}
      />
      {error && <Error>{error}</Error>}
    </GlobalContainer>
  )
}

Global.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.any,
  error: PropTypes.string,
  onChange: PropTypes.func,
}

Global.defaultProps = {}

export default Global
