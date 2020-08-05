import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  TableContainer,
  Table,
  THead,
  TBody,
  Help,
  ButtonContainer,
  NewRowButton,
  SubmitButton
} from './styles'
import { Global, Page } from 'js/components'
import { formatDate } from 'js/components/inputs/date_input'

function Form(props) {
  const {
    schema,
    submit,
    submitting,
  } = props

  const [globalErrors, setGlobalErrors] = useState({})
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

  const getDefault = c => {
    const val = c.config.default
    if (c.type === 'date') {
      if (val === 'empty') {
        return null
      }
      return formatDate(val ? new Date(val) : new Date())
    } else if (c.type === 'bool') {
      return !!val
    }
    return val
  }

  const [globals, setGlobals] = useState(globalSchema.reduce((p, s) => ({ ...p, [s.id]: getDefault(s) }), {}))
  const setGlobal = (id, val) => {
    if (globalErrors[id]) {
      const {
        [id]: _,
        ...newGlobalErrors
      } = globalErrors
      setGlobalErrors(newGlobalErrors)
    }
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

  const defaultRow = tableSchema.reduce((p, c) => ({ ...p, [c.id]: getDefault(c) }), {})
  const [nextRowId, setNextRowId] = useState(1)
  const [rows, setRows] = useState({ 0: defaultRow })
  const setRowValue = (rowId, colId, val) => {
    const row = rows[rowId]
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

  const addRow = () => {
    setRows({
      ...rows,
      [nextRowId]: defaultRow,
    })
    setNextRowId(nextRowId + 1)
  }

  const deleteRow = (id) => {
    if (confirm('Delete row? Values will be lost.')) {
      const newRows = { ...rows }
      delete newRows[id]
      setRows(newRows)
    }
  }

  const submitAll = () => {
    const errors = globalSchema.reduce((errs, g) => {
      if (g.required && !globals[g.id]) {
        errs[g.id] = `${g.label} cannot be left blank`
      }
      return errs
    }, {})
    if (Object.keys(errors).length) {
      setGlobalErrors(errors)
    } else if (confirm('Submit data? Please make sure entered data is correct.')) {
      submit({ globals, rows })
      setDirty(false)
    }
  }

  useEffect(() => {
    window.onbeforeunload = () => dirty ? true : undefined
  }, [dirty])

  return (
    <article>
      <section>
        {globalSchema.map(g => (
          <Global
            key={g.id}
            schema={g}
            values={globals}
            keys={keys}
            error={globalErrors[g.id]}
            onChange={d => setGlobal(g.id, d)}
          />
        ))}
        {tableSchema.length > 0 && Object.entries(rows).map(([rowId, row]) => (
          <Page
            key={rowId}
            rowId={rowId}
            schema={tableSchema}
            values={row}
            globals={globals}
            keys={keys}
            deleteRow={() => deleteRow(rowId)}
            onChange={setRowValue}
          />
        ))}
        <ButtonContainer>
          {tableSchema.length > 0 ? (
            <NewRowButton onClick={addRow}>New Row</NewRowButton>
          ) : (
            <div />
          )}
          <SubmitButton onClick={submitAll} disabled={submitting}>Submit</SubmitButton>
        </ButtonContainer>
      </section>
    </article>
  )
}

Form.propTypes = {
  schema: PropTypes.array,
  submit: PropTypes.func,
  submitting: PropTypes.bool,
}

Form.defaultProps = {
  submitting: false,
}

export default Form
