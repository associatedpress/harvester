import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChoiceInput from './ChoiceInput'
import { parseValue, serializeValue } from './utils'
import { Select, Creatable } from './styles'
import { fetchOptions, createOption } from 'js/store/actions/form'
import { getFieldOptions } from 'js/store/selectors/form'

function SelectInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
    fetchOptions,
    createOption,
    options,
  } = props

  const fieldId = schema.id
  const {
    optionlist,
    multiple,
    creatable,
    serialization,
  } = schema.config
  useEffect(() => {
    if (!optionlist) {
      fetchOptions({ fieldId, range: schema.config.options.range })
    }
  }, [fieldId, optionlist])

  if (optionlist) return <ChoiceInput {...props} />

  const parsedValue = parseValue(value, { multiple, serialization })

  const getLabel = opt => opt.label || opt.value
  const selected = multiple
    ? options.filter(opt => parsedValue.includes(opt.value))
    : options.find(opt => opt.value === parsedValue)

  const Input = creatable ? Creatable : Select

  const onChange = (opt, action) => {
    const newValue = opt && (multiple ? opt.map(o => o.value) : opt.value)
    setField(serializeValue(newValue, { multiple, serialization }))
    if (action.action === 'create-option') {
      createOption({ fieldId: schema.id, option: opt })
    }
  }

  return (
    <Input
      value={selected || null}
      options={options}
      getOptionLabel={getLabel}
      getNewOptionData={value => ({ value })}
      isClearable
      isMulti={multiple}
      onChange={onChange}
      onBlur={validateField}
    />
  )
}

SelectInput.propTypes = {
  schema: PropTypes.object,
  value: PropTypes.string,
  setField: PropTypes.func,
  validateField: PropTypes.func,
  fetchOptions: PropTypes.func,
  createOption: PropTypes.func,
  options: PropTypes.array,
}

SelectInput.defaultProps = {
  value: '',
  options: [],
}

function mapStateToProps(state, { schema }) {
  return {
    options: getFieldOptions(state, schema.id),
  }
}

export default connect(mapStateToProps, { fetchOptions, createOption })(SelectInput)
