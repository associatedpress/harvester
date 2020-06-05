import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input } from './styles'

function NumberCell(props) {
  const {
    onChange,
    value,
  } = props

  return (
    <td>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </td>
  )
}

NumberCell.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

NumberCell.defaultProps = {
  value: 0,
}

export default NumberCell
