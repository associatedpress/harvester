import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Global, Page, Loading, DocContext } from 'js/components'
import { ButtonContainer, SubmitButton } from 'js/components/form/styles'

function Current(props) {
  const {
    schema,
    index,
  } = props

  const docId = useContext(DocContext)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const indexKeys = index.split('+')
  const indexIds = schema.reduce((ids, s, i) => {
    if (s.config.key) {
      ids[s.config.key] = i
    }
    return ids
  }, {})

  const keys = schema.reduce((ks, s) => {
    const { key } = s.config
    if (key) {
      ks[key] = s.id
    }
    return ks
  }, {})

  const [searches, setSearches] = useState({})
  const setSearch = (id, val) => {
    if (!val && val !== 0) {
      const {
        [id]: _,
        ...newSearches
      } = searches
      setSearches(newSearches)
    } else {
      setSearches({ ...searches, [id]: val })
    }
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setResult({})
    const clean = val => (typeof val === 'boolean') ? val.toString().toUpperCase() : val
    const index = indexKeys.map(k => clean(searches[indexIds[k]])).join('--')
    const q = new URLSearchParams({ index })
    const url = `/api/${docId}/current?${q}`
    fetch(url)
      .then(rsp => rsp.json())
      .then(res => {
        setSubmitting(false)
        setResult(res)
      })
      .catch(() => setSubmitting(false))
  }

  return (
    <article>
      <section>
        {indexKeys.map(k => {
          const g = schema[indexIds[k]]
          return (
            <Global
              key={g.id}
              schema={g}
              values={searches}
              keys={keys}
              onChange={d => setSearch(g.id, d)}
            />
          )
        })}
        <ButtonContainer>
          <div />
          <SubmitButton onClick={handleSubmit} disabled={submitting}>Search</SubmitButton>
        </ButtonContainer>
        {result && (
          <>
            <div>CURRENT VALUE</div>
            {submitting ? (
              <Loading />
            ) : (
              result.current ? (
                <Page
                  rowId={0}
                  schema={schema}
                  values={result.current.reduce((p, d, i) => ({ ...p, [i]: d }), {})}
                  keys={keys}
                  readOnly
                  timestamp={new Date(result.lastUpdated)}
                />
              ) : (
                <div>No results found</div>
              )
            )}
          </>
        )}
      </section>
    </article>
  )
}

Current.propTypes = {
  schema: PropTypes.array,
  index: PropTypes.string,
}

Current.defaultProps = {}

export default Current
