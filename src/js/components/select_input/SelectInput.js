import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChoiceInput from './ChoiceInput'
import { parseValue, serializeValue } from './utils'
import { Select, Creatable } from './styles'
import { fetchOptions, createOption } from 'js/store/actions/form'
import { getFieldOptions, getFieldValue, getFieldIdByKey } from 'js/store/selectors/form'

function SelectInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
    fetchOptions,
    createOption,
    options,
    requireValue,
  } = props

  const fieldId = schema.id
  const {
    optionlist,
    multiple,
    creatable,
    serialization,
    requires,
  } = schema.config

  useEffect(() => {
    if (optionlist) return
    if (requires && requireValue == null) return
    fetchOptions({ fieldId, range: schema.config.options.range, requires, requireValue })
  }, [fieldId, optionlist, requires, requireValue])

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
      [opt].flat().forEach(newOpt => {
        createOption({ fieldId: schema.id, option: newOpt })
      })
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
  requireValue: PropTypes.any,
}

SelectInput.defaultProps = {
  value: '',
}

function mapStateToProps(state, { schema }) {
  const requireFieldId = getFieldIdByKey(state, schema.config.requires)
  return {
    options: getFieldOptions(state, schema.id),
    requireValue: getFieldValue(state, requireFieldId),
  }
}

export default connect(mapStateToProps, { fetchOptions, createOption })(SelectInput)
