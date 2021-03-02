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

const label = (button) => {
  if (button.button.label) return button.button.label
  const name = button.button.name || button.name
  return `Sign in with ${name}`
}

function SignInPage(props) {
  const {
    logo,
    buttons,
    formType,
    formId,
  } = props

  return (
    <Layout logo={logo}>
      <Article>
        <ButtonsContainer>
          {buttons.map((button, i) => {
            return (
              <ButtonContainer key={i} href={button.path}>
                <ButtonIconContainer>
                  <ButtonIcon icon={button.button && button.button.icon} />
                </ButtonIconContainer>
                <ButtonLabel>{label(button)}</ButtonLabel>
              </ButtonContainer>
            )
          })}
        </ButtonsContainer>
      </Article>
    </Layout>
  )
}

SignInPage.propTypes = {
  logo: PropTypes.string,
  buttons: PropTypes.array,
  formType: PropTypes.string,
  formId: PropTypes.string,
}

SignInPage.defaultProps = {
  buttons: [],
}

export default SignInPage
