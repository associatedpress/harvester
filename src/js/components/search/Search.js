import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Global, Page, Loading, DocContext } from 'js/components'
import { formatDate } from 'js/components/inputs/date_input'
import { ButtonContainer, SubmitButton } from 'js/components/form/styles'

function Search(props) {
  const {
    schema,
  } = props

  const docId = useContext(DocContext)
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState(null)
  const searchSchema = schema.filter(s => s.config.search)

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
    setResults([])
    const clean = val => (typeof val === 'boolean') ? val.toString().toUpperCase() : val
    const params = Object.keys(searches).reduce((p, k) => ({
      ...p,
      [+k + 1]: clean(searches[k]),
    }), {})
    const q = new URLSearchParams({ ...params, headers: 'false' })
    const url = `/api/${docId}/sheet/entry?${q}`
    console.log(params)
    console.log(url)
    fetch(url)
      .then(rsp => rsp.json())
      .then(results => {
        setSubmitting(false)
        setResults(results.map(row => {
          const r = row.slice(1).reduce((vals, d, i) => ({ ...vals, [i]: d }), {})
          r.timestamp = row[0]
          return r
        }))
      })
      .catch(() => setSubmitting(false))
  }

  return (
    <article>
      <section>
        {searchSchema.map(g => (
          <Global
            key={g.id}
            schema={g}
            values={searches}
            keys={keys}
            onChange={d => setSearch(g.id, d)}
          />
        ))}
        <ButtonContainer>
          <div />
          <SubmitButton onClick={handleSubmit} disabled={submitting}>Search</SubmitButton>
        </ButtonContainer>
        {results && (
          <>
            <div>RESULTS ({results.length})</div>
            {submitting ? (
              <Loading />
            ) : (
              results.length ? (
                results.map((row, i) => (
                  <Page
                    key={i}
                    rowId={i}
                    schema={schema}
                    values={row}
                    keys={keys}
                    readOnly
                    timestamp={row.timestamp && new Date(row.timestamp)}
                  />
                ))
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

Search.propTypes = {
  schema: PropTypes.array,
}

Search.defaultProps = {}

export default Search
