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

  const processRows = async (rows) => {
    const creatableSelects = schema.columns.filter(col => (
      col.type === 'select' && col.config.creatable
    ))
    Object.values(rows).forEach(row => {
      creatableSelects.forEach(({ id, config }) => {
        const value = row[id]
        const { options, range } = config.options
        const optionValues = options.map(opt => opt.value)
        if (!optionValues.includes(value)) {
          const cfg = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([[value]]),
          }
          const params = new URLSearchParams({ range })
          fetch(`/api/${docId}/entry?${params.toString()}`, cfg)
        }
      })
    })
  }

  const submit = (data) => {
    const { globals, rows } = data
    const now = new Date()
    const fullRows = Object.values(rows).map(row => [now, ...Object.values(globals), ...Object.values(row)])

    setSubmitting(true)
    processRows(rows)
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullRows),
    }
    fetch(`/api/${docId}/entry`, config)
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
            docId={docId}
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
