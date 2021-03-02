import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Footer } from 'js/components'
import { Main } from 'js/styles/containers'
import { Wrapper } from './styles'

function Layout(props) {
  const {
    logo,
    user,
    children,
  } = props

  return (
    <>
      <Wrapper>
        <Main>
          <Navbar logo={logo} user={user} />
          {children}
        </Main>
      </Wrapper>
      <Footer user={user} />
    </>
  )
}

Layout.propTypes = {
  logo: PropTypes.string,
  user: PropTypes.object,
  children: PropTypes.any,
}

Layout.defaultProps = {}

export default Layout
