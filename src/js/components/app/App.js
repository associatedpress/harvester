import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useData } from 'ap-react-hooks'
import { Footer } from 'ap-react-components'
import { Form, Done, DocContext, Loading, Search, Current } from 'js/components'
import { FlexInteractive, FlexStatic, H1, Chatter, NavButton } from './styles'

function App(props) {
  const {
    className,
    docId,
  } = props

  const [formId, setFormId] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [view, setView] = useState('form')

  const bust = url => `${url}?_=${formId}`

  const schema = useData(bust(`/api/${docId}/schema`), { onError: e => e })

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

    const fullRows = Object.values(rows).map(row => {
      const globalVals = Object.values(globals)
      const rowVals = Object.values(row)
      return [now, ...globalVals, ...rowVals]
    })

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
    return <Loading />
  }

  const { headline, chatter, index, columns } = schema
  const search = columns.some(c => c.config.search)

  return (
    <DocContext.Provider value={docId}>
      <FlexInteractive className={className}>
        <FlexStatic>
          {index && <NavButton active={view === 'current'} onClick={() => setView('current')}>Current</NavButton>}
          {search && <NavButton active={view === 'search'} onClick={() => setView('search')}>Search</NavButton>}
          <NavButton active={view === 'form'} onClick={() => setView('form')}>Form</NavButton>
          {view === 'search' && (
            <>
              {headline && <H1>{headline} Search</H1>}
              <Chatter>
                Enter your search values below and results will show up at the bottom.
              </Chatter>
              <Search schema={columns} />
            </>
          )}
          {view === 'current' && (
            <>
              {headline && <H1>{headline} Current Values</H1>}
              <Current
                index={index}
                schema={columns}
              />
            </>
          )}
          {view === 'form' && (
            <>
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
            </>
          )}
          <Footer
            credit='The Data Team'
          />
        </FlexStatic>
      </FlexInteractive>
    </DocContext.Provider>
  )
}

App.propTypes = {
  className: PropTypes.string,
  docId: PropTypes.string,
}

App.defaultProps = {}

export default App
