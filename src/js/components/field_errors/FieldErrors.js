import React from 'react'
import PropTypes from 'prop-types'

function FieldErrors(props) {
  const {
    errors,
    children,
  } = props

  const hasError = errors && (errors.length > 0)

  return (
    <div>
      {hasError && <div>{`Error: ${errors.join(', ')}`}</div>}
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
