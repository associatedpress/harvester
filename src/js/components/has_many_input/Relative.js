import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'js/components'
import { RelativeContainer, Deleted, Form, DestroyButton } from './styles'
import UndoDelete from './UndoDelete'

function Relative(props) {
  const {
    namespace,
    schema,
    values,
    errors,
    setField,
    validateField,
    destroy,
    undoDestroy,
    deleted,
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
      {deleted && <UndoDelete undo={undoDestroy} />}
      <Deleted deleted={deleted}>
        <Form>
          {schema.map((column, i) => (
            <Field
              key={column.id}
              namespace={namespace}
              schema={column}
              value={values[i]}
              errors={errors[i]}
              setField={setRelativeField(i)}
              validateField={validateField}
            />
          ))}
        </Form>
        <DestroyButton onClick={destroy}>X</DestroyButton>
      </Deleted>
    </RelativeContainer>
  )
}

Relative.propTypes = {
  namespace: PropTypes.string,
  schema: PropTypes.array,
  values: PropTypes.array,
  errors: PropTypes.object,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  destroy: PropTypes.func,
  undoDestroy: PropTypes.func,
  deleted: PropTypes.bool,
}

Relative.defaultProps = {
  errors: {},
  deleted: false,
}

export default Relative
