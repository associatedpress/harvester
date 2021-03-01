import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Footer } from 'js/components'
import { Main, Article } from 'js/styles/containers'
import { Wrapper } from './styles'

function Layout(props) {
  const {
    user,
    children,
  } = props

  return (
    <>
      <Wrapper>
        <Main>
          <Navbar user={user} />
          {children}
        </Main>
      </Wrapper>
      <Footer user={user} />
    </>
  )
}

Layout.propTypes = {
  user: PropTypes.object,
  children: PropTypes.any,
}

Layout.defaultProps = {}

export default Layout
