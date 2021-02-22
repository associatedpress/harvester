import React from 'react'
import PropTypes from 'prop-types'
import { Nav, Brand, User, LogOut, LogIn } from './styles'

function Navbar(props) {
  const {
    user,
    formId,
    formType,
  } = props

  const q = (formType && formId) && `?${new URLSearchParams({ formId, formType })}`

  return (
    <Nav>
      <Brand>Harvester</Brand>
      {user ? (
        <User>
          <div>{user.email}</div>
          <LogOut q={q} />
        </User>
      ) : (
        <User>
          <LogIn q={q} />
        </User>
      )}
    </Nav>
  )
}

Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  formId: PropTypes.string,
  formType: PropTypes.string,
}

Navbar.defaultProps = {}

export default Navbar
