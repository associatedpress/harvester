import React from 'react'
import PropTypes from 'prop-types'
import { Container, Message } from './styles'

function FieldErrors(props) {
  const {
    errors,
    children,
  } = props

  const hasError = errors && Array.isArray(errors) && errors.length > 0
  const hasMessage = hasError && Array.isArray(errors)

  return (
    <Container hasError={hasError}>
      {children}
      <Message>{hasMessage && `Error: ${errors.join(', ')}`}</Message>
    </Container>
  )
}

FieldErrors.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  children: PropTypes.any,
}

FieldErrors.defaultProps = {}

export default FieldErrors
