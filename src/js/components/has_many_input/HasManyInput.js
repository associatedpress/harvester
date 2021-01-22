import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRelativeSchema } from 'js/store/selectors/form'
import Relative from './Relative'
import { parseValue, serializeValue } from '../select_input/utils'

function HasManyInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
    relativeSchema,
  } = props

  const {
    serialization,
  } = schema.config

  const parsedValue = parseValue(value, { multiple: true, serialization })

  const createRelative = () => {
    const newValue = [...parsedValue, relativeSchema.map(c => null)]
    const serializedValue = serializeValue(newValue, { multiple: true, serialization })
    setField(serializedValue)
  }

  const destroyRelative = idx => {
    return () => {
      const newRelatives = [...parsedValue]
      newRelatives.splice(idx, 1)
      const serialized = serializeValue(newRelatives, { multiple: true, serialization })
      setField(serialized)
      validateField()
    }
  }

  const setRelative = idx => {
    return values => {
      const newRelatives = [...parsedValue]
      newRelatives.splice(idx, 1, values)
      const serialized = serializeValue(newRelatives, { multiple: true, serialization })
      setField(serialized)
    }
  }

  return (
    <div>
      {parsedValue.map((values, i) => (
        <Relative
          key={i}
          schema={relativeSchema}
          values={values}
          setField={setRelative(i)}
          validateField={validateField}
          destroy={destroyRelative(i)}
        />
      ))}
      <button onClick={createRelative}>New</button>
    </div>
  )
}

HasManyInput.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  relativeSchema: PropTypes.array,
}

HasManyInput.defaultProps = {}

function mapStateToProps(state, { schema }) {
  const { relative } = schema.config
  const relativeSchema = getRelativeSchema(state, relative)
  return { relativeSchema }
}

export default connect(mapStateToProps)(HasManyInput)
