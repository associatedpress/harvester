import React from 'react'
import PropTypes from 'prop-types'
import { Notes, NoteConfirm, NoteError } from './styles'

function Notifications(props) {
  const {
    notifications,
  } = props

  if (!notifications || !notifications.length) {
    return null
  }

  return (
    <Notes>
      {notifications.map(note => {
        if(note.messageType && note.messageType === 'error'){
          return <NoteError key={note.id}>{note.message}</NoteError>
        }else{
          return <NoteConfirm key={note.id}>{note.message}</NoteConfirm>
        }
      })}
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
