import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Header } from 'js/components'
import { Container } from './styles'

function LandingPage(props) {
  const {
    user,
  } = props

  return (
    <div>
      <Navbar user={user} />
      <Container>
        Hello! Welcome to Harvester.
      </Container>
    </div>
  )
}

LandingPage.propTypes = {
  user: PropTypes.object,
}

LandingPage.defaultProps = {}

export default LandingPage
