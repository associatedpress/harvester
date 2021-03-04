import React from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'js/components'
import { Container, Hero, Title, Description, ButtonLink } from './styles'

function LandingPage(props) {
  const {
    logo,
    user,
  } = props

  const repo = 'https://github.com/associatedpress/harvester'
  const docs = 'https://harvester.readthedocs.io/en/latest/'

  const openSource = <a href={repo}>open source</a>

  return (
    <Container>
      <Navbar logo={logo} user={user} />
      <Hero>
        <Title>Rake in the data.</Title>
        <Description>
          Originally developed by the AP Data Team, Harvester is
          a collaborative data collection platform that helps your newsroom
          develop data-driven stories. Harvester is {openSource}, so you can
          set it up in your newsroom or help make it better for all of us.
        </Description>
        <ButtonLink href={docs}>
          Read the documentation
        </ButtonLink>
      </Hero>
    </Container>
  )
}

LandingPage.propTypes = {
  logo: PropTypes.string,
  user: PropTypes.object,
}

LandingPage.defaultProps = {}

export default LandingPage
