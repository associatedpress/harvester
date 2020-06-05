import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Td } from './styles'

function BoolCell(props) {
  const {
    onChange,
    value,
  } = props

  return (
    <Td>
      <input
        type='checkbox'
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
    </Td>
  )
}

BoolCell.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
}

BoolCell.defaultProps = {
  value: false,
}

export default BoolCell
