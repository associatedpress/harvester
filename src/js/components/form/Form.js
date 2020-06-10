import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  THead,
  TBody,
  ButtonContainer,
  NewRowButton,
  SubmitButton
} from './styles'
import { Global, Row } from 'js/components'

function Form(props) {
  const {
    schema,
    submit,
    submitting,
  } = props

  const [globalErrors, setGlobalErrors] = useState({})

  const globalSchema = schema.filter(s => s.config.global)
  const tableSchema = schema.filter(s => !s.config.global)

  const [globals, setGlobals] = useState(globalSchema.reduce((p, s) => ({ ...p, [s.id]: s.config.default }), {}))
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

  const defaultRow = tableSchema.reduce((p, c) => ({ ...p, [c.id]: c.config.default }), {})
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
      const now = new Date()
      const fullRows = Object.values(rows).map(row => [now, ...Object.values(globals), ...Object.values(row)])
      submit(fullRows)
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
        <Table>
          <THead>
            <tr>
              {tableSchema.map((c, i) => (
                <th key={i}>{c.label}</th>
              ))}
              <th />
            </tr>
          </THead>
          <TBody>
            {Object.entries(rows).map(([rowId, row]) => (
              <Row
                key={rowId}
                rowId={rowId}
                schema={tableSchema}
                values={row}
                deleteRow={() => deleteRow(rowId)}
                onChange={setRowValue}
              />
            ))}
          </TBody>
        </Table>
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
