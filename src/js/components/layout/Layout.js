import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Footer, EmbedResizeMessenger } from 'js/components'
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
    embed,
  } = props

  return (
    <EmbedResizeMessenger>
      <Main>
        {embed ? (
          children
        ) : (
          <>
            <Navbar logo={logo} user={user} formType={formType} formId={formId} />
            <Wrapper>
              {children}
            </Wrapper>
          </>
        )}
        <Footer version={version} />
      </Main>
    </EmbedResizeMessenger>
  )
}

Layout.propTypes = {
  version: PropTypes.string,
  logo: PropTypes.string,
  user: PropTypes.object,
  formType: PropTypes.string,
  formId: PropTypes.string,
  children: PropTypes.any,
  embed: PropTypes.bool,
}

Layout.defaultProps = {
  embed: false,
}

export default Layout
