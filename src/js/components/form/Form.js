import React, { useState } from 'react'
import {
  Table,
  THead,
  TBody,
  Label,
  ButtonContainer,
  NewRowButton,
  SubmitButton
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

  const [cityIdx, setCityIdx] = useState()
  const [date, setDate] = useState(new Date())

  const defaultRow = schema.map(c => c.default)
  const [rows, setRows] = useState([defaultRow])
  const insert = (arr, i, v) => [...arr.slice(0, i), v, ...arr.slice(i + 1)]
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

  const formatDate = date => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const submitAll = () => {
    const city = cities[cityIdx]
    const fullRows = rows.map(row => [formatDate(date), city.city, city.state, ...row])
    submit(fullRows)
  }

  return (
    <article>
      <section>
        <div>
          <Label>Date:</Label>
          <DatePicker
            selected={date}
            onChange={setDate}
          />
        </div>
        <div>
          <Label>City:</Label>
          <select value={cityIdx} onChange={e => setCityIdx(e.target.value)}>
            <option>Select a city</option>
            {cities.map((c, i) => (
              <option key={i} value={i}>{c.city}, {c.state}</option>
            ))}
          </select>
        </div>
        <Table>
          <THead>
            <tr>
              {schema.map((c, i) => (
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
                schema={schema}
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
