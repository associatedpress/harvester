import React, { useState } from 'react'
import {
  Table,
  THead,
  TBody,
  Label,
  ButtonContainer,
  NewRowButton,
  SubmitButton,
  Error,
  Select
} from './styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Row } from 'js/components'

function Form(props) {
  const {
    schema,
    submit,
    cities,
    submitting,
  } = props

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${month}/${day}/${year}`
  }

  const [globalErrors, setGlobalErrors] = useState({})

  const globalSchema = schema.filter(s => s.config.global)
  const tableSchema = schema.filter(s => !s.config.global)

  const insert = (arr, i, v) => [...arr.slice(0, i), v, ...arr.slice(i + 1)]

  const [globals, setGlobals] = useState(globalSchema.map(s => s.config.default))
  const setGlobal = (index, val) => {
    if (globalErrors[index]) {
      setGlobalErrors(Object.assign({}, globalErrors, { [index]: undefined }))
    }
    const newGlobals = insert(globals, index, val)
    setGlobals(newGlobals)
  }

  const defaultRow = tableSchema.map(c => c.config.default)
  const [rows, setRows] = useState([defaultRow])
  const setRowValue = (rowNum, index, val) => {
    const row = rows[rowNum]
    const newRow = insert(row, index, val)
    const newRows = insert(rows, rowNum, newRow)
    setRows(newRows)
  }
  const addRow = () => setRows([...rows, defaultRow])
  const deleteRow = (index) => {
    if (confirm('Delete row? Values will be lost.')) {
      const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)]
      setRows(newRows)
    }
  }

  const submitAll = () => {
    const errors = globalSchema.reduce((errs, g, i) => {
      if (!globals[i]) {
        errs[i] = `${g.label} cannot be left blank`
      }
      return errs
    }, {})
    if (Object.keys(errors).length) {
      setGlobalErrors(errors)
    } else if (confirm('Submit data? Values cannot be changed after submission.')) {
      const now = new Date()
      const fullRows = rows.map(row => [now, ...globals, ...row])
      submit(fullRows)
    }
  }

  return (
    <article>
      <section>
        {globalSchema.map((g, i) => {
          if (g.type === 'date') {
            return (
              <div key={i}>
                <Label>{g.label}:</Label>
                <DatePicker
                  selected={new Date(globals[i])}
                  onChange={d => setGlobal(i, formatDate(d))}
                />
                {globalErrors[i] && (
                  <Error>{globalErrors[i]}</Error>
                )}
              </div>
            )
          }
          if (g.type === 'select') {
            const selected = g.config.options.find(opt => opt.value === globals[i])
            return (
              <div key={i}>
                <Label>{g.label}:</Label>
                <Select
                  value={selected}
                  options={g.config.options}
                  onChange={opt => setGlobal(i, opt.value)}
                />
                {globalErrors[i] && (
                  <Error>{globalErrors[i]}</Error>
                )}
              </div>
            )
          }
        })}
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
            {rows.map((row, index) => (
              <Row
                key={index}
                rowNum={index}
                schema={tableSchema}
                values={row}
                deleteRow={() => deleteRow(index)}
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

Form.propTypes = {}

Form.defaultProps = {}

export default Form
