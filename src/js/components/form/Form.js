import React, { useState } from 'react'
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
import { Global, Row, Page } from 'js/components'
import { formatDate } from 'js/components/inputs/date_input'

function Form(props) {
  const {
    schema,
    submit,
    submitting,
  } = props

  console.log(schema)

  const [globalErrors, setGlobalErrors] = useState({})

  const globalSchema = schema.filter(s => s.config.global)
  const tableSchema = schema.filter(s => !s.config.global)

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

  const [globals, setGlobals] = useState(globalSchema.reduce((p, s) => ({ ...p, [s.id]: getDefault(s) }), {}))
  const setGlobal = (id, val) => {
    if (globalErrors[id]) {
      const newGlobalErrors = { ...globalErrors }
      delete newGlobalErrors[id]
      setGlobalErrors(newGlobalErrors)
    }
    const newGlobals = {
      ...globals,
      [id]: val,
    }
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
    } else if (confirm('Submit data? Values cannot be changed after submission.')) {
      submit({ globals, rows })
    }
  }

  return (
    <article>
      <section>
        {globalSchema.map(g => (
          <Global
            key={g.id}
            schema={g}
            value={globals[g.id]}
            error={globalErrors[g.id]}
            onChange={d => setGlobal(g.id, d)}
          />
        ))}
        {Object.entries(rows).map(([rowId, row]) => (
          <Page
            key={rowId}
            rowId={rowId}
            schema={tableSchema}
            values={row}
            deleteRow={() => deleteRow(rowId)}
            onChange={setRowValue}
          />
        ))}
        <ButtonContainer>
          <NewRowButton onClick={addRow}>New Row</NewRowButton>
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
