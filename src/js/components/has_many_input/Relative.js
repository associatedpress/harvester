import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'js/components'
import { RelativeContainer, Deleted, Form, DestroyButton } from './styles'
import UndoDelete from './UndoDelete'

function Relative(props) {
  const {
    schema,
    values,
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
              schema={column}
              value={values[i]}
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
  schema: PropTypes.array,
  values: PropTypes.array,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  destroy: PropTypes.func,
  deleted: PropTypes.bool,
}

Relative.defaultProps = {
  deleted: false,
}

export default Relative
