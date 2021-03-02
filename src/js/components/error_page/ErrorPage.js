import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'js/components'
import { Article } from 'js/styles/containers'
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
    <Layout user={user}>
      <Article>
        <ErrorContainer>
          <ErrorHeader>
            <ErrorStatus>{status}</ErrorStatus>
            <ErrorTitle>Oops!</ErrorTitle>
          </ErrorHeader>
          <ErrorBody>Something went wrong.</ErrorBody>
          <ErrorDetail>{message}</ErrorDetail>
        </ErrorContainer>
      </Article>
    </Layout>
  )
}

ErrorPage.propTypes = {
  user: PropTypes.object,
  status: PropTypes.number,
  message: PropTypes.string,
}

ErrorPage.defaultProps = {}

export default ErrorPage
