import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRelativeSchema } from 'js/store/selectors/form'
import Relative from './Relative'
import { parseValue, serializeValue } from 'js/utils/serialize'
import { Controls, NewButton } from './styles'

function HasManyInput(props) {
  const {
    schema,
    value,
    errors,
    setField,
    validateField,
    relativeSchema,
  } = props

  const [relatives, setRelatives] = useState([])
  const updateRelatives = newRelatives => {
    setRelatives(newRelatives)
    const activeRelatives = newRelatives
      .filter(rel => !rel.deleted)
      .map(rel => rel.relative)
    const serializedValue = serializeValue(
      activeRelatives,
      { multiple: true, serialization }
    )
    setField(serializedValue)
    validateField()
  }

  const {
    serialization,
  } = schema.config

  const parsedValue = parseValue(value, { multiple: true, serialization })
  useEffect(() => {
    setRelatives(parsedValue.map((relative, id) => ({
      id,
      relative,
      deleted: false,
    })))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const createRelative = () => {
    const newRelative = relativeSchema.map(() => null)
    updateRelatives([
      ...relatives,
      { id: relatives.length, relative: newRelative, deleted: false },
    ])
  }

  const destroyRelative = id => {
    return () => {
      const newRelatives = relatives.map(relative => {
        return {
          ...relative,
          deleted: relative.deleted || relative.id === id,
        }
      })
      updateRelatives(newRelatives)
    }
  }

  const undoDestroyRelative = id => {
    return () => {
      const newRelatives = relatives.map(relative => {
        return {
          ...relative,
          deleted: relative.id !== id && relative.deleted,
        }
      })
      updateRelatives(newRelatives)
    }
  }

  const setRelative = id => {
    return values => {
      const newRelatives = relatives.map(relative => {
        if (relative.id !== id) return relative
        return {
          ...relative,
          relative: values,
        }
      })
      updateRelatives(newRelatives)
    }
  }

  const relativeErrors = relatives.reduce((es, rel) => {
    const relErrs = rel.deleted ? undefined : errors[es.count]
    const increment = rel.deleted ? 0 : 1
    return {
      count: es.count + increment,
      errors: [...es.errors, relErrs],
    }
  }, { count: 0, errors: [] })

  return (
    <div>
      {relatives.map((relative, i) => (
        <Relative
          key={relative.id}
          namespace={`${schema.relative}-${relative.id}`}
          schema={relativeSchema}
          values={relative.relative}
          errors={relativeErrors.errors[i]}
          setField={setRelative(relative.id)}
          validateField={validateField}
          destroy={destroyRelative(relative.id)}
          undoDestroy={undoDestroyRelative(relative.id)}
          deleted={relative.deleted}
        />
      ))}
      <Controls>
        <NewButton onClick={createRelative}>New</NewButton>
      </Controls>
    </div>
  )
}

HasManyInput.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.string,
  errors: PropTypes.object,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  relativeSchema: PropTypes.array,
}

HasManyInput.defaultProps = {
  errors: {},
}

function mapStateToProps(state, { schema }) {
  const { relative } = schema.config
  const relativeSchema = getRelativeSchema(state, relative)
  return { relativeSchema }
}

export default connect(mapStateToProps)(HasManyInput)
