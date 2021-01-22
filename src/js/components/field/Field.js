import React from 'react'
import PropTypes from 'prop-types'
import {
  FieldErrors,
  FieldHelp,
  NumberInput,
  DateInput,
  SelectInput,
  StringInput,
  TextInput,
  HasManyInput
} from 'js/components'
import { Label } from './styles'

function Field(props) {
  const {
    schema,
    value,
    errors,
    setField,
    validateField,
  } = props

  const typeInputs = {
    string: StringInput,
    number: NumberInput,
    date: DateInput,
    text: TextInput,
    select: SelectInput,
    has_many: HasManyInput,
  }

  const Input = typeInputs[schema.type]

  return (
    <FieldErrors errors={errors}>
      <Label>{schema.label}</Label>
      <FieldHelp help={schema.config.help} />
      <Input
        schema={schema}
        value={value}
        setField={setField}
        validateField={validateField}
      />
    </FieldErrors>
  )
}

Field.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.any,
  errors: PropTypes.array,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

Field.defaultProps = {
  validateField: () => {},
}

export default Field
