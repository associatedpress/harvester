import React from 'react'
import PropTypes from 'prop-types'
import {
  Nav,
  Logo,
  Brand,
  User,
  LogOutLink,
  LogOutIcon,
  LogInLink,
  LogInIcon
} from './styles'

function Navbar(props) {
  const {
    logo,
    user,
    formId,
    formType,
  } = props

  const q = (formType && formId) && `?${new URLSearchParams({ formId, formType })}`

  return (
    <Nav>
      <Logo logo={logo} />
      <Brand>Harvester</Brand>
      {user ? (
        <User>
          <div>{user.email}</div>
          <LogOutLink q={q}><LogOutIcon /></LogOutLink>
        </User>
      ) : (
        <User>
          <LogInLink q={q}><LogInIcon /></LogInLink>
        </User>
      )}
    </Nav>
  )
}

Navbar.propTypes = {
  logo: PropTypes.string,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  formId: PropTypes.string,
  formType: PropTypes.string,
}

Navbar.defaultProps = {}

export default Navbar
