import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Footer } from 'js/components'
import { Main } from 'js/styles/containers'
import { Wrapper } from './styles'

function Layout(props) {
  const {
    version,
    logo,
    user,
    formType,
    formId,
    children,
  } = props

  return (
    <Main>
      <Navbar logo={logo} user={user} formType={formType} formId={formId} />
      <Wrapper>
        {children}
      </Wrapper>
      <Footer version={version} />
    </Main>
  )
}

Layout.propTypes = {
  version: PropTypes.string,
  logo: PropTypes.string,
  user: PropTypes.object,
  formType: PropTypes.string,
  formId: PropTypes.string,
  children: PropTypes.any,
}

Layout.defaultProps = {}

export default Layout
