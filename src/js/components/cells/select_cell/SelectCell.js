import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select } from './styles'

function SelectCell(props) {
  const {
    onChange,
    value,
    valueKey,
    options,
  } = props

  const getValue = opt => (valueKey || valueKey === 0) ? opt[valueKey] : opt

  return (
    <td>
      <Select
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value='' />
        {options.map((opt, i) => (
          <option key={i} value={getValue(opt)}>{getValue(opt)}</option>
        ))}
      </Select>
    </td>
  )
}

SelectCell.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
}

SelectCell.defaultProps = {}

export default SelectCell
