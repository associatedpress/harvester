import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Undo, Button } from './styles'

function UndoDelete(props) {
  const {
    undo,
  } = props

  const button = useRef()
  useEffect(() => button.current.focus(), [])

  return (
    <Undo>
      <Button ref={button} onClick={undo}>Undo</Button>
    </Undo>
  )
}

UndoDelete.propTypes = {
  undo: PropTypes.func,
}

UndoDelete.defaultProps = {}

export default UndoDelete
