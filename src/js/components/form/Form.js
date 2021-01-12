import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'js/components'

function Form(props) {
  const {
    fields,
  } = props

  return (
    <div>
      {fields.map(field => (
        <Field key={field.id} schema={field} />
      ))}
    </div>
  )
}

Form.propTypes = {
  fields: PropTypes.array,
}

Form.defaultProps = {
  fields: [],
}

export default Form
