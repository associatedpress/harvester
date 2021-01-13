import React from 'react'
import PropTypes from 'prop-types'
import { BoxLabel, Checkbox, Radio } from './styles'
import * as CSV from 'csv-string'

function parseValue(value, opts = {}) {
  const {
    multiple = false,
    serialization = 'json',
  } = opts
  if (!multiple) return value
  const parsers = {
    csv: v => CSV.parse(v)[0],
    json: JSON.parse,
  }
  const fn = parsers[serialization] || parsers.json
  return value ? fn(value) : []
}

function serializeValue(value, opts = {}) {
  const {
    multiple = false,
    serialization = 'json',
  } = opts
  if (!multiple) return value
  const serializers = {
    csv: CSV.stringify,
    json: JSON.stringify,
  }
  const fn = serializers[serialization] || serializers.json
  return value && fn(value).trim()
}

function SelectInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
    multiple,
    optionlist,
    serialization,
  } = props

  const Input = multiple ? Checkbox : Radio
  const parsedValue = parseValue(value, { multiple, serialization })
  const selectedOption = multiple
    ? optionlist.filter(opt => parsedValue.includes(opt))
    : optionlist.find(opt => opt === parsedValue)

  const getNewSelected = (opt, alreadyChecked) => {
    if (!multiple) return (alreadyChecked ? null : opt)
    const newSelected = alreadyChecked
      ? selectedOption.filter(o => o !== opt)
      : [...selectedOption, opt]
    return (newSelected.length ? newSelected : null)
  }

  const handleChange = (opt, checked) => {
    setField(serializeValue(getNewSelected(opt, checked), { multiple, serialization }))
  }

  return (
    <div>
      {optionlist.map((opt, i) => {
        const checked = multiple
          ? selectedOption.includes(opt)
          : (selectedOption === opt)
        return (
          <div key={i}>
            <Input
              name={`select-${schema.id}`}
              checked={checked}
              onChange={() => handleChange(opt, checked)}
              onBlur={validateField}
              onClick={multiple ? undefined : () => {
                checked && handleChange(opt, true)
              }}
            />
            <BoxLabel>{opt}</BoxLabel>
          </div>
        )
      })}
    </div>
  )
}

SelectInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
}

SelectInput.defaultProps = {
  value: '',
}

export default SelectInput
