import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function Header(props) {
  const {
    headline,
    chatter,
  } = props

  return (
    <div>
      {headline && <h1>{headline}</h1>}
      {chatter && <div>{chatter}</div>}
    </div>
  )
}

Header.propTypes = {
  headline: PropTypes.string,
  chatter: PropTypes.string,
}

Header.defaultProps = {}

function mapStateToProps(state) {
  return state.form.schema
}

export default connect(mapStateToProps)(Header)
