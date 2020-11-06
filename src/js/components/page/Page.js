import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TypedInput } from 'js/components/inputs'
import { Container, Row, Label, Value, Help, Delete, Expand, Collapse, Controls, Preview, Body } from './styles'

function Page(props) {
  const {
    schema,
    rowId,
    values,
    globals,
    keys,
    onChange,
    deleteRow,
    readOnly,
    timestamp,
    created,
  } = props

  const [isOpen, setIsOpen] = useState(true)

  const preview = schema
    .map(col => {
      const value = values[col.id]
      const unset = (typeof value === 'undefined') || (value === null)
      return `${col.label}: ${unset ? 'unset' : value}`
    })
    .join(', ')

  return (
    <Container>
      <Controls>
        {isOpen ? (
          <Collapse onClick={() => setIsOpen(false)} />
        ) : (
          <div>
            <Expand onClick={() => setIsOpen(true)} />
            {preview}
          </div>
        )}
        {timestamp && <div>{timestamp.toLocaleString()}</div>}
        {deleteRow && <Delete onClick={deleteRow} />}
      </Controls>
      {isOpen && (
        <Body>
          {schema.map(col => {
            const { type, config } = col
            return (
              <Row key={col.id}>
                <Label>
                  {col.label}{col.config.help && (
                    <Help title={col.config.help} />
                  )}
                </Label>
                <Value>
                  <TypedInput
                    rowId={rowId}
                    colId={col.id}
                    type={type}
                    onChange={v => onChange(rowId, col.id, v)}
                    value={values[col.id]}
                    values={{ ...values, ...globals }}
                    keys={keys}
                    readOnly={readOnly}
                    created={created}
                    {...config}
                  />
                </Value>
              </Row>
            )
          })}
        </Body>
      )}
    </Container>
  )
}

Page.propTypes = {
  schema: PropTypes.array,
  rowId: PropTypes.any,
  values: PropTypes.object,
  onChange: PropTypes.func,
  deleteRow: PropTypes.func,
  readOnly: PropTypes.bool,
  timestamp: PropTypes.object,
  created: PropTypes.object,
}

Page.defaultProps = {
  readOnly: false,
}

export default Page
