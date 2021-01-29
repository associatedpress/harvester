import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'js/components'
import { RelativeContainer, Form, DestroyButton } from './styles'

function Relative(props) {
  const {
    schema,
    values,
    setField,
    validateField,
    destroy,
  } = props

  const setRelativeField = idx => {
    return value => {
      const newValues = [...values]
      newValues.splice(idx, 1, value)
      setField(newValues)
    }
  }

  return (
    <RelativeContainer>
      <Form>
        {schema.map((column, i) => (
          <Field
            key={column.id}
            schema={column}
            value={values[i]}
            setField={setRelativeField(i)}
            validateField={validateField}
          />
        ))}
      </Form>
      <DestroyButton onClick={destroy}>X</DestroyButton>
    </RelativeContainer>
  )
}

Relative.propTypes = {
  schema: PropTypes.array,
  values: PropTypes.array,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  destroy: PropTypes.func,
}

Relative.defaultProps = {}

export default Relative
