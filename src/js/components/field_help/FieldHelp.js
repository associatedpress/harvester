import React from 'react'
import PropTypes from 'prop-types'
import { Help } from './styles'

function FieldHelp(props) {
  const {
    help,
  } = props

  if (!help) return null

  return (
    <Help>{help}</Help>
  )
}

FieldHelp.propTypes = {
  help: PropTypes.string,
}

FieldHelp.defaultProps = {}

export default FieldHelp
