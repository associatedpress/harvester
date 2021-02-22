import React from 'react'
import { Controls } from 'js/components'
import {
  Container,
  Message
} from './styles'

function Finished() {
  const buttons = [{
    label: 'Submit another form',
    primary: true,
    onClick: () => {
      window.location.reload(true)
    },
  }]

  return (
    <Container>
      <Message>
        Thank you! Your form has been submitted successfully. Press the button below to submit another form.
      </Message>
      <Controls buttons={buttons} />
    </Container>
  )
}

Finished.propTypes = {}

Finished.defaultProps = {}

export default Finished
