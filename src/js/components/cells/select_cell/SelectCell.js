import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Creatable } from './styles'

function SelectCell(props) {
  const {
    onChange,
    value,
    options,
    creatable,
  } = props

  const getLabel = opt => opt.label || opt.value
  const selected = options.find(opt => opt.value === value)

  const C = creatable ? Creatable : Select

  return (
    <td>
      <C
        value={selected}
        options={options}
        getOptionLabel={getLabel}
        getNewOptionData={value => ({ value })}
        onChange={opt => onChange(opt.value)}
      />
    </td>
  )
}

SelectCell.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

SelectCell.defaultProps = {}

export default SelectCell
