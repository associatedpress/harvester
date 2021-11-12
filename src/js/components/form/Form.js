import React from 'react'
import PropTypes from 'prop-types'
import { Controls, Field, TextBlock } from 'js/components'

function Form(props) {
  const {
    blocks,
    columns,
    controls,
    values,
    errors,
    setField,
    validateField,
  } = props

  if (!blocks || !columns) return null

  function renderBlock(block) {
    if (block.type === 'text') return (
      <TextBlock dangerouslySetInnerHTML={{ __html: block.html }} />
    )

    const field = columns[block.index]
    return (
      <Field
        key={field.id}
        schema={field}
        value={values[field.id]}
        errors={errors[field.id]}
        setField={value => setField({ fieldId: field.id, value })}
        validateField={() => validateField({ fieldId: field.id })}
      />
    )
  }

  return (
    <>
      {blocks.map((block, i) => (
        <React.Fragment key={i}>
          {renderBlock(block)}
        </React.Fragment>
      ))}
      <Controls buttons={controls} />
    </>
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
