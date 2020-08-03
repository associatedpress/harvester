import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Global, Page, Loading, DocContext } from 'js/components'
import { ButtonContainer, SubmitButton } from 'js/components/form/styles'
import { formatDate } from 'js/components/inputs/date_input'

function Current(props) {
  const {
    schema,
    index,
    submit,
    submitting,
  } = props

  const docId = useContext(DocContext)
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState(null)
  const [dirty, setDirty] = useState(false)

  const keys = schema.reduce((ks, s) => {
    const { key } = s.config
    if (key) {
      ks[key] = s.id
    }
    return ks
  }, {})
  const reqLookup = schema.reduce((ks, s) => {
    const { requires } = s.config
    if (requires) {
      ks[keys[requires]] = [...(ks[requires] || []), s.id]
    }
    return ks
  }, {})

  const indexKeys = index.split('+')
  const indexIds = schema.reduce((ids, s, i) => {
    if (s.config.key) {
      ids[s.config.key] = i
    }
    return ids
  }, {})

  const [searches, setSearches] = useState({})
  const setSearch = (id, val) => {
    const newSearches = { ...searches, [id]: val }
    if (reqLookup[id]) {
      reqLookup[id].forEach(r => {
        delete newSearches[r]
      })
    }
    setSearches(newSearches)
  }

  const getDefault = c => {
    const val = c.config.default
    if (c.type === 'date') {
      if (val === 'empty') {
        return null
      }
      return formatDate(val ? new Date(val) : new Date())
    }
    return val
  }
  const defaultRow = schema.reduce((p, s) => ({ ...p, [s.id]: getDefault(s) }), {})
  const [currentRow, setCurrentRow] = useState({})
  const setCurrentRowVal = (_, id, val) => {
    const res = (result && result.current) ? result.current : []
    const newVals = {
      ...defaultRow,
      ...searches,
      ...res,
      ...currentRow,
      [id]: val,
    }
    if (reqLookup[id]) {
      reqLookup[id].forEach(r => {
        delete newVals[r]
      })
    }
    setDirty(true)
    setCurrentRow(newVals)
  }

  const handleSearch = () => {
    setSearching(true)
    setResult({})
    const clean = val => (typeof val === 'boolean') ? val.toString().toUpperCase() : val
    const index = indexKeys.map(k => clean(searches[indexIds[k]])).join('--')
    const q = new URLSearchParams({ index })
    const url = `/api/${docId}/current?${q}`
    fetch(url)
      .then(rsp => rsp.json())
      .then(res => {
        setSearching(false)
        setResult(res)
        const curr = res.current || []
        const newVals = {
          ...defaultRow,
          ...searches,
          ...curr,
        }
        setCurrentRow(newVals)
      })
      .catch(() => setSearching(false))
  }

  const handleSubmit = () => {
    if (confirm('Submit data? Please make sure entered data is correct.')) {
      setDirty(false)
      submit({ rows: [currentRow] })
    }
  }

  const missingSearch = Object.values(indexIds).some(k => !searches[k] && searches[k] !== 0)
  const searchDisabled = searching || missingSearch

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
          <SubmitButton onClick={searchDisabled ? undefined : handleSearch} disabled={searchDisabled}>Search</SubmitButton>
        </ButtonContainer>
        {result && (
          <>
            <div>CURRENT VALUE</div>
            {searching ? (
              <Loading />
            ) : (
              <>
                <Page
                  rowId={0}
                  schema={schema}
                  values={currentRow}
                  keys={keys}
                  timestamp={new Date(result.lastUpdated)}
                  onChange={setCurrentRowVal}
                />
                <ButtonContainer>
                  <div />
                  <SubmitButton onClick={handleSubmit} disabled={submitting}>Update</SubmitButton>
                </ButtonContainer>
              </>
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
