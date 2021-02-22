import React from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'js/components'
import { Main } from 'js/styles/containers'
import {
  ErrorContainer,
  ErrorHeader,
  ErrorStatus,
  ErrorTitle,
  ErrorBody,
  ErrorDetail
} from './styles'

function ErrorPage(props) {
  const {
    user,
    status,
    message,
    formType,
    formId,
  } = props

  return (
    <div>
      <Navbar user={user} formType={formType} formId={formId} />
      <Main>
        <ErrorContainer>
          <ErrorHeader>
            <ErrorStatus>{status}</ErrorStatus>
            <ErrorTitle>Oops!</ErrorTitle>
          </ErrorHeader>
          <ErrorBody>Something went wrong.</ErrorBody>
          <ErrorDetail>{message}</ErrorDetail>
        </ErrorContainer>
      </Main>
    </div>
  )
}

ErrorPage.propTypes = {
  user: PropTypes.object,
  status: PropTypes.number,
  message: PropTypes.string,
}

ErrorPage.defaultProps = {}

export default ErrorPage
