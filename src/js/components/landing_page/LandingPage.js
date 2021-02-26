import React from 'react'
import { Navbar, Header } from 'js/components'
import { Container } from './styles'

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Container>
        Hello! Welcome to Harvester.
      </Container>
    </div>
  )
}

LandingPage.propTypes = {}

LandingPage.defaultProps = {}

export default LandingPage
