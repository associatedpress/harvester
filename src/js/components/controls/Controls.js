import React from 'react'
import PropTypes from 'prop-types'
import { Well, Button } from './styles'

function Controls(props) {
  const {
    buttons,
  } = props

  if (!buttons || !buttons.length) {
    return null
  }

  return (
    <Well>
      {buttons.map(({ label, onClick, disabled, primary }, i) => (
        <Button
          key={i}
          onClick={onClick}
          disabled={disabled}
          primary={primary}
        >
          {label}
        </Button>
      ))}
    </Well>
  )
}

Controls.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
  })),
}

Controls.defaultProps = {}

export default Controls
