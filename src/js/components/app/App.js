import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useData } from 'ap-react-hooks'
import { Flex, Headline, Chatter, Footer } from 'ap-react-components'
import { initGA, PageView } from 'interact-analytics'
import { Form, Done } from 'js/components'

function App(props) {
  const {
    className,
  } = props

  // useEffect(() => {
  //   initGA('UA-19104461-7')
  //   PageView()
  // }, [])

  const cities = useData('/api/sheet/cities', { initial: [] })
  const charges = useData('/api/sheet/charges', { initial: [] })
  const race = useData('/api/sheet/races', { initial: [] })
  const age = useData('/api/sheet/ages', { initial: [] })

  const schema = [
    { type: 'bool', label: 'Cumulative?', default: false },
    { type: 'number', label: 'Arrests', default: 0, },
    { type: 'select', label: 'Charge', default: '', valueKey: 'charge', options: charges, },
    { type: 'select', label: 'Race', default: '', valueKey: 'race', options: race },
    { type: 'select', label: 'Age', default: '', valueKey: 'age', options: age},
  ]

  const [formId, setFormId] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

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
    <Flex.Interactive className={className}>
      <Flex.Static>
        <Headline>Protest Arrests Data Entry</Headline>
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
      </Flex.Static>
    </Flex.Interactive>
  )
}

App.propTypes = {
  className: PropTypes.string,
}

App.defaultProps = {}

export default App
