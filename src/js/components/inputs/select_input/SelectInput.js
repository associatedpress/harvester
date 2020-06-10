import React from 'react'
import PropTypes from 'prop-types'
import { Select, Creatable } from './styles'

function SelectInput(props) {
  const {
    onChange,
    value,
    options,
    creatable,
  } = props

  const getLabel = opt => opt.label || opt.value
  const selected = options.options.find(opt => opt.value === value)

  const C = creatable ? Creatable : Select

  return (
    <C
      value={selected}
      options={options.options}
      getOptionLabel={getLabel}
      getNewOptionData={value => ({ value })}
      onChange={opt => onChange(opt.value)}
    />
  )
}

SelectInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.object,
  creatable: PropTypes.bool,
}

SelectInput.defaultProps = {
  creatable: false,
}

export default SelectInput
