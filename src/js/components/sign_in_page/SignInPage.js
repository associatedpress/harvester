import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'js/components'
import { Article } from 'js/styles/containers'
import {
  ButtonsContainer,
  ButtonContainer,
  ButtonIconContainer,
  ButtonIcon,
  ButtonLabel
} from './styles'

function SignInPage(props) {
  const {
    buttons,
    formType,
    formId,
  } = props

  return (
    <Layout>
      <Article>
        <ButtonsContainer>
          {buttons.map((button, i) => {
            return (
              <ButtonContainer key={i} href={button.path}>
                <ButtonIconContainer>
                  <ButtonIcon icon={button.icon} />
                </ButtonIconContainer>
                <ButtonLabel>{button.label || `Sign in with ${button.name}`}</ButtonLabel>
              </ButtonContainer>
            )
          })}
        </ButtonsContainer>
      </Article>
    </Layout>
  )
}

SignInPage.propTypes = {
  buttons: PropTypes.array,
}

SignInPage.defaultProps = {
  buttons: [],
}

export default SignInPage
