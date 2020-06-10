import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useData } from 'ap-react-hooks'
import { Footer } from 'ap-react-components'
import { Form, Done } from 'js/components'
import { FlexInteractive, FlexStatic, H1, Chatter } from './styles'

function App(props) {
  const {
    className,
    docId,
  } = props

  const [formId, setFormId] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const bust = url => `${url}?_=${formId}`

  const schema = useData(bust(`/api/${docId}/schema`))

  const submit = (rows) => {
    setSubmitting(true)
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rows),
    }
    fetch('/api/append-rows', config)
      .then(rsp => {
        setSubmitting(false)
        if (rsp.ok) {
          setDone(true)
        }
      })
  }

  const restart = () => {
    setDone(false)
    setFormId(formId + 1)
  }

  if (!schema) {
    return null
  }

  const { headline, chatter, columns } = schema

  return (
    <FlexInteractive className={className}>
      <FlexStatic>
        {headline && <H1>{headline}</H1>}
        {chatter && <Chatter>{chatter}</Chatter>}
        {done ? (
          <Done restart={restart} />
        ) : (
          <Form
            key={formId}
            schema={columns}
            submitting={submitting}
            submit={submit}
          />
        )}
        <Footer
          credit='The Data Team'
        />
      </FlexStatic>
    </FlexInteractive>
  )
}

App.propTypes = {
  className: PropTypes.string,
  docId: PropTypes.string,
}

App.defaultProps = {}

export default App
