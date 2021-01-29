import React from 'react'
import PropTypes from 'prop-types'
import { Container, Message } from './styles'

function FieldErrors(props) {
  const {
    errors,
    children,
  } = props

  const hasError = errors && (errors.length > 0)

  return (
    <Container hasError={hasError}>
      {children}
      <Message>{hasError && `Error: ${errors.join(', ')}`}</Message>
    </Container>
  )
}

FieldErrors.propTypes = {
  errors: PropTypes.array,
  children: PropTypes.any,
}

FieldErrors.defaultProps = {}

export default FieldErrors
