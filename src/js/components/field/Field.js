import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setField, validateField } from 'js/store/actions/form'
import {
  FieldErrors,
  NumberInput,
  DateInput,
  //SelectInput,
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
    //select: SelectInput,
  }

  const Input = typeInputs[schema.type]

  return (
    <div>
      <FieldErrors errors={errors}>
        <div>{schema.label}</div>
        <Input
          {...schema.config}
          schema={schema}
          value={value}
          setField={value => setField({ fieldId: schema.id, value })}
          validateField={() => validateField({ fieldId: schema.id })}
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

function mapStateToProps({ form }, { schema }) {
  return {
    value: form.fields[schema.id],
    errors: form.errors[schema.id],
  }
}

export default connect(mapStateToProps, { setField, validateField })(Field)
