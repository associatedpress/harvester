import React from 'react'
import PropTypes from 'prop-types'
import { BoolCell, NumberCell, SelectCell } from 'js/components/cells'
import { Delete } from './styles'

function Row(props) {
  const {
    schema,
    rowNum,
    values,
    onChange,
    boolCell,
    numberCell,
    selectCell,
    deleteRow,
  } = props

  const cells = {
    bool: boolCell,
    number: numberCell,
    select: selectCell,
  }

  return (
    <tr>
      {schema.map((col, i) => {
        const { type, ...cellProps } = col
        const C = cells[type]
        return (
          <C
            key={i}
            onChange={v => onChange(rowNum, i, v)}
            value={values[i]}
            {...cellProps}
          />
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
  rowNum: PropTypes.number,
  onChange: PropTypes.func,
  deleteRow: PropTypes.func,
  boolCell: PropTypes.elementType,
  numberCell: PropTypes.elementType,
  selectCell: PropTypes.elementType,
}

Row.defaultProps = {
  boolCell: BoolCell,
  numberCell: NumberCell,
  selectCell: SelectCell,
}

export default Row
