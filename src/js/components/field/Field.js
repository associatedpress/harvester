import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setField, validateField } from 'js/store/actions/form'
import { getFieldValue, getFieldErrors } from 'js/store/selectors/form'
import {
  FieldErrors,
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
        <Input
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

function mapStateToProps(state, { schema }) {
  return {
    value: getFieldValue(state, schema.id),
    errors: getFieldErrors(state, schema.id),
  }
}

export default connect(mapStateToProps, { setField, validateField })(Field)
