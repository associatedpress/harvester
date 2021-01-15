import React from 'react'
import PropTypes from 'prop-types'

function Notifications(props) {
  const {
    notifications,
  } = props

  if (!notifications || !notifications.length) {
    return null
  }

  return (
    <ul>
      {notifications.map(note => (
        <li key={note.id}>{note.message}</li>
      ))}
    </ul>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.array,
}

Notifications.defaultProps = {
  notifications: [],
}

export default Notifications
