import React from 'react'
import PropTypes from 'prop-types'
import { Notes, Note } from './styles'

function Notifications(props) {
  const {
    notifications,
  } = props

  if (!notifications || !notifications.length) {
    return null
  }

  return (
    <Notes>
      {notifications.map(note => (
        <Note key={note.id}>{note.message}</Note>
      ))}
    </Notes>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.array,
}

Notifications.defaultProps = {
  notifications: [],
}

export default Notifications
