import React from 'react'
import PropTypes from 'prop-types'
import {
  FieldErrors,
  FieldHelp,
  NumberInput,
  DateTimeInput,
  SelectInput,
  StringInput,
  TextInput,
  HasManyInput
} from 'js/components'
import { FieldText, Label } from './styles'

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
    datetime: DateTimeInput,
    text: TextInput,
    select: SelectInput,
    has_many: HasManyInput,
  }

  const Input = typeInputs[schema.type]

  return (
    <FieldErrors errors={errors}>
      <FieldText>
        <Label>{schema.label}</Label>
        <FieldHelp help={schema.config.help} />
      </FieldText>
      <Input
        schema={schema}
        value={value}
        errors={errors}
        setField={setField}
        validateField={validateField}
      />
    </FieldErrors>
  )
}

Field.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.any,
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

Field.defaultProps = {
  validateField: () => {},
}

export default Field
