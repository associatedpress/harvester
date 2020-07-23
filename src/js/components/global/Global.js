import React from 'react'
import PropTypes from 'prop-types'
import { TypedInput } from 'js/components/inputs'
import { GlobalContainer, Label, Value, Error } from './styles'

function Global(props) {
  const {
    schema,
    values,
    keys,
    error,
    onChange,
  } = props

  const { type, label, config } = schema

  return (
    <GlobalContainer>
      <Label>{label}</Label>
      <Value>
        <TypedInput
          type={type}
          value={values[schema.id]}
          values={values}
          keys={keys}
          onChange={onChange}
          {...config}
        />
        {error && <Error>{error}</Error>}
      </Value>
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