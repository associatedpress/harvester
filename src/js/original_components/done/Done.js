import React from 'react'
import PropTypes from 'prop-types'
import { Message, Button } from './styles'

function Done(props) {
  const {
    restart,
  } = props

  return (
    <Message>
      Thank you for submitting data!
      <div>
        <Button onClick={restart}>Enter More Data</Button>
      </div>
    </Message>
  )
}

Done.propTypes = {
  restart: PropTypes.func,
}

Done.defaultProps = {}

export default Done
