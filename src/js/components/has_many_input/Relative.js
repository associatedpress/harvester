import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'js/components'

function Relative(props) {
  const {
    id,
    schema,
    values,
    setField,
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
        />
      ))}
      <button onClick={destroy}>Destroy</button>
    </div>
  )
}

Relative.propTypes = {
  id: PropTypes.any,
  schema: PropTypes.array,
  values: PropTypes.array,
}

Relative.defaultProps = {}

export default Relative
