import React from 'react'
import PropTypes from 'prop-types'
import { TypedInput } from 'js/components/inputs'
import { Delete } from './styles'

function Row(props) {
  const {
    schema,
    rowId,
    values,
    onChange,
    deleteRow,
  } = props

  return (
    <tr>
      {schema.map(col => {
        const { type, config } = col
        return (
          <td key={col.id}>
            <TypedInput
              type={type}
              onChange={v => onChange(rowId, col.id, v)}
              value={values[col.id]}
              {...config}
            />
          </td>
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
}

Row.defaultProps = {}

export default Row
