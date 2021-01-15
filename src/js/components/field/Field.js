import React from 'react'
import PropTypes from 'prop-types'
import {
  FieldErrors,
  FieldHelp,
  NumberInput,
  DateInput,
  SelectInput,
  StringInput,
  TextInput
} from 'js/components'

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
  }

  const Input = typeInputs[schema.type]

  return (
    <div>
      <FieldErrors errors={errors}>
        <div>{schema.label}</div>
        <FieldHelp help={schema.config.help} />
        <Input
          schema={schema}
          value={value}
          setField={setField}
          validateField={validateField}
        />
      </FieldErrors>
    </div>
  )
}

Field.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.any,
  errors: PropTypes.array,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

Field.defaultProps = {}

export default Field
