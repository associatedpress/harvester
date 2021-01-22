import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'js/components'

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
    <div>
      {schema.map((column, i) => (
        <Field
          key={column.id}
          schema={column}
          value={values[i]}
          setField={setRelativeField(i)}
          validateField={validateField}
        />
      ))}
      <button onClick={destroy}>Destroy</button>
    </div>
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
