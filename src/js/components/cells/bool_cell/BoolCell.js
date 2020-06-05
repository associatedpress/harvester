import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function BoolCell(props) {
  const {
    onChange,
    value,
  } = props

  return (
    <td>
      <input
        type='checkbox'
        checked={value}
        onChange={e => onChange(e.target.checked)}
      />
    </td>
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
