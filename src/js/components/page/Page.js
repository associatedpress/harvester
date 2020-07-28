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
        <Delete onClick={deleteRow} />
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
}

Page.defaultProps = {}

export default Page
