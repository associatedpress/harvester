import React from 'react'
import PropTypes from 'prop-types'
import { TypedInput } from 'js/components/inputs'
import { Td, Delete } from './styles'

function Row(props) {
  const {
    schema,
    rowId,
    values,
    onChange,
    deleteRow,
    page,
  } = props

  if (page) {
    return (
      <>
        {schema.map(col => {
          const { type, config } = col
          return (
            <tr>
              <th scope='row'>{col.label}</th>
              <Td key={col.id}>
                <TypedInput
                  type={type}
                  onChange={v => onChange(rowId, col.id, v)}
                  value={values[col.id]}
                  {...config}
                />
              </Td>
            </tr>
          )
        })}
        <tr>
          <th scope='row'>Delete</th>
          <td>
            <Delete onClick={deleteRow} />
          </td>
        </tr>
      </>
    )
  }

  return (
    <tr>
      {schema.map(col => {
        const { type, config } = col
        return (
          <Td key={col.id}>
            <TypedInput
              type={type}
              onChange={v => onChange(rowId, col.id, v)}
              value={values[col.id]}
              {...config}
            />
          </Td>
        )
      })}
      <td>
        <Delete onClick={deleteRow} />
      </td>
    </tr>
  )
}

Row.propTypes = {
  schema: PropTypes.array,
  rowId: PropTypes.any,
  values: PropTypes.object,
  onChange: PropTypes.func,
  deleteRow: PropTypes.func,
  page: PropTypes.bool,
}

Row.defaultProps = {
  page: false,
}

export default Row
