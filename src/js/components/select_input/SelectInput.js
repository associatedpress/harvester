import React from 'react'
import PropTypes from 'prop-types'
import ChoiceInput from './ChoiceInput'
import { parseValue, serializeValue } from './utils'

function SelectInput(props) {
  if (props.optionlist) return <ChoiceInput {...props} />

  const {
    value,
    setField,
    validateField,
    multiple,
    creatable,
    serialization,
  } = props

  return null
  //const reqId = requires && keys[requires]
  //const reqVal = values[reqId]
  //const q = new URLSearchParams({ [requires]: reqVal })
  //const url = reqVal ? `/api/${docId}/sheet/${options.range}?${q}` : undefined
  //const requireOpts = useData(url, { initial: [] })

  //const parsedValue = parseValue(value)

  //const getOpts = () => {
  //  if (requires) return requireOpts
  //  const createdOpts = (created && created[colId]) || []
  //  return [...options.options, ...createdOpts]
  //}
  //const opts = getOpts()

  //const getLabel = opt => opt.label || opt.value
  //const selected = multiple
  //  ? opts.filter(opt => parsedValue.includes(opt.value))
  //  : opts.find(opt => opt.value === parsedValue)

  //const C = creatable ? Creatable : Select

  //return (
  //  <C
  //    value={selected || null}
  //    options={opts}
  //    getOptionLabel={getLabel}
  //    getNewOptionData={value => ({ value })}
  //    isClearable
  //    isMulti={multiple}
  //    readOnly={readOnly}
  //    isDisabled={readOnly}
  //    onChange={opt => onChange(opt && serialize(opt))}
  //  />
  //)

}

SelectInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
}

SelectInput.defaultProps = {
  value: '',
}

export default SelectInput
