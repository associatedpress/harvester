import React from 'react'
import PropTypes from 'prop-types'

function FieldErrors(props) {
  const {
    errors,
    children,
  } = props

  return (
    <div>
      {children}
    </div>
  )
}

FieldErrors.propTypes = {
  errors: PropTypes.array,
  children: PropTypes.any,
}

FieldErrors.defaultProps = {}

export default FieldErrors
