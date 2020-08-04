import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Global, Page, Loading, DocContext } from 'js/components'
import { ButtonContainer, SubmitButton, NewRowButton } from 'js/components/form/styles'
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

  const globalSchema = schema.filter(s => s.config.global)
  const tableSchema = schema.filter(s => !s.config.global)

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
  const indexIds = indexKeys.reduce((p, k) => ({ ...p, [k]: keys[k] }), {})

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
  const defaultGlobals = globalSchema.reduce((p, s) => ({ ...p, [s.id]: getDefault(s) }), {})
  const defaultRow = tableSchema.reduce((p, s) => ({ ...p, [s.id]: getDefault(s) }), {})

  const [globals, setGlobals] = useState(null)
  const setGlobal = (id, val) => {
    const newGlobals = {
      ...globals,
      [id]: val,
    }
    if (reqLookup[id]) {
      reqLookup[id].forEach(r => {
        delete newGlobals[r]
      })
    }
    setDirty(true)
    setGlobals(newGlobals)
  }

  const [rows, setRows] = useState(null)
  const [addedRows, setAddedRows] = useState([])
  const setRowValue = (rowId, colId, val) => {
    const row = rows[rowId] || {}
    const newRow = {
      ...row,
      [colId]: val,
    }
    if (reqLookup[colId]) {
      reqLookup[colId].forEach(r => {
        delete newRow[r]
      })
    }
    setDirty(true)
    const newRows = {
      ...rows,
      [rowId]: newRow,
    }
    setRows(newRows)
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
        const curr = res.current || {}
        const gs = curr.globals || {}
        const rs = curr.rows || { 0: defaultRow }
        setGlobals({
          ...defaultGlobals,
          ...gs,
        })
        setRows(Object.entries(rs).reduce((p, [id, r]) => ({ ...p, [id]: { ...defaultRow, ...r } }), {}))
      })
      .catch(err => {
        console.error(err)
        setSearching(false)
      })
  }

  const handleSubmit = () => {
    if (confirm('Submit data? Please make sure entered data is correct.')) {
      setDirty(false)
      submit({ globals, rows })
    }
  }

  const deleteRow = (id) => {
    if (confirm('Delete row? Values will be lost.')) {
      const newRows = { ...rows }
      delete newRows[id]
      setRows(newRows)
      setAddedRows(addedRows.filter(r => r !== id))
    }
  }

  const addRow = () => {
    const nextRowId = Math.max(...Object.keys(rows).map(k => +k)) + 1
    console.log({ nextRowId })
    setRows({
      ...rows,
      [nextRowId]: defaultRow,
    })
    setAddedRows([...addedRows, nextRowId])
  }

  const missingSearch = Object.values(indexIds).some(k => !searches[k] && (searches[k] !== 0))
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
                {globals && globalSchema.map(g => (
                  <Global
                    key={g.id}
                    schema={g}
                    values={globals}
                    keys={keys}
                    onChange={d => setGlobal(g.id, d)}
                  />
                ))}
                {rows && tableSchema.length > 0 && Object.entries(rows).map(([rowId, row]) => (
                  <Page
                    key={rowId}
                    rowId={rowId}
                    schema={tableSchema}
                    values={row}
                    keys={keys}
                    deleteRow={addedRows.includes(+rowId) ? () => deleteRow(+rowId) : undefined}
                    onChange={setRowValue}
                  />
                ))}
                <ButtonContainer>
                  {tableSchema.length > 0 ? (
                    <NewRowButton onClick={addRow}>New Row</NewRowButton>
                  ) : (
                    <div />
                  )}
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
