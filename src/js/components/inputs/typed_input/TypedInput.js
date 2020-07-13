import React from 'react'
import PropTypes from 'prop-types'
import {
  BoolInput,
  NumberInput,
  DateInput,
  SelectInput,
  StringInput
} from '..'

function TypedInput(props) {
  const {
    type,
    ...inputProps
  } = props

  const typeInputs = {
    bool: BoolInput,
    number: NumberInput,
    date: DateInput,
    select: SelectInput,
    string: StringInput,
  }

  const C = typeInputs[type]

  return (
    <C {...inputProps} />
  )
}

TypedInput.propTypes = {
  type: PropTypes.oneOf([
    'bool',
    'number',
    'date',
    'select',
    'string',
  ]).isRequired,
}

TypedInput.defaultProps = {}

export default TypedInput
