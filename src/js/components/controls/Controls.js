import React from 'react'
import PropTypes from 'prop-types'

function Controls(props) {
  const {
    buttons,
  } = props

  if (!buttons || !buttons.length) {
    return null
  }

  return (
    <div>
      {buttons.map(({ label, onClick, disabled }, i) => (
        <button key={i} onClick={onClick} disabled={disabled}>{label}</button>
      ))}
    </div>
  )
}

Controls.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  })),
}

Controls.defaultProps = {}

export default Controls
