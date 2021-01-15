import React from 'react'
import PropTypes from 'prop-types'

function FieldHelp(props) {
  const {
    help,
  } = props

  if (!help) return null

  return (
    <div>{help}</div>
  )
}

FieldHelp.propTypes = {
  help: PropTypes.string,
}

FieldHelp.defaultProps = {}

export default FieldHelp
