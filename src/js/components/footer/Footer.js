import React from 'react'
import { Main } from 'js/styles/containers'
import { Container, Logo, FooterContent } from './styles'

function Footer() {
  const openSource = (
    <a href='https://github.com/associatedpress/harvester'>open source</a>
  )

  return (
    <Container>
      <Main>
        <FooterContent>
          AP Harvester was originally developed by the AP Data Team. It is
          completely {openSource}, so you can help make it better for all of
          us.
        </FooterContent>
      </Main>
    </Container>
  )
}

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer
