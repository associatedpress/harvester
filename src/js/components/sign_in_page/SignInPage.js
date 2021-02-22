import React from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'js/components'
import { Main } from 'js/styles/containers'
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
    <div>
      <Navbar formType={formType} formId={formId} />
      <Main>
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
      </Main>
    </div>
  )
}

SignInPage.propTypes = {
  buttons: PropTypes.array,
}

SignInPage.defaultProps = {
  buttons: [],
}

export default SignInPage
