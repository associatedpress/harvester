import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useData } from 'ap-react-hooks'
import { Footer } from 'ap-react-components'
import { initGA, PageView } from 'interact-analytics'
import { Form, Done } from 'js/components'
import { FlexInteractive, FlexStatic, H1, Chatter } from './styles'

function App(props) {
  const {
    className,
  } = props

  // useEffect(() => {
  //   initGA('UA-19104461-7')
  //   PageView()
  // }, [])

  const [formId, setFormId] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const bust = url => `${url}?_=${formId}`

  const cities = useData('/api/sheet/cities', { initial: [] })
  const race = useData('/api/sheet/races', { initial: [] })
  const age = useData('/api/sheet/ages', { initial: [] })
  const charges = useData(bust('/api/existing-charges'), { initial: [] }).map(value => ({ value }))
  console.log(charges)

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${month}/${day}/${year}`
  }

  const schema = [
    { type: 'date', label: 'Date', default: formatDate(new Date()), global: true },
    { type: 'select', label: 'City', default: '', options: cities, global: true },
    { type: 'bool', label: 'Cumulative?', default: false },
    { type: 'number', label: 'Arrests', default: 0, },
    { type: 'select', label: 'Charge', default: '', options: charges, creatable: true },
    { type: 'select', label: 'Race', default: '', options: race },
    { type: 'select', label: 'Age', default: '', options: age },
  ]

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

  return (
    <FlexInteractive className={className}>
      <FlexStatic>
        <H1>Protest Arrests Data Entry</H1>
        <Chatter>
          Please enter arrests data below:
        </Chatter>
        {done ? (
          <Done restart={restart} />
        ) : (
          <Form
            key={formId}
            schema={schema}
            cities={cities}
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
}

App.defaultProps = {}

export default App
