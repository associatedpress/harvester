import React from 'react'
import PropTypes from 'prop-types'
import { Controls, Field } from 'js/components'

function Form(props) {
  const {
    fields,
    controls,
    values,
    errors,
    setField,
    validateField,
  } = props

  if (!fields) return null

  return (
    <div>
      <div>
        {fields.map(field => (
          <Field
            key={field.id}
            schema={field}
            value={values[field.id]}
            errors={errors[field.id]}
            setField={value => setField({ fieldId: field.id, value })}
            validateField={() => validateField({ fieldId: field.id })}
          />
        ))}
      </div>
      <Controls buttons={controls} />
    </div>
  )
}

Form.propTypes = {
  fields: PropTypes.array,
  controls: PropTypes.array,
  values: PropTypes.object,
  errors: PropTypes.object,
  setField: PropTypes.func,
  validateField: PropTypes.func,
}

Form.defaultProps = {
  errors: {},
  validateField: () => {},
}

export default Form
