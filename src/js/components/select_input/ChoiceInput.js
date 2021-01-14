import React from 'react'
import PropTypes from 'prop-types'
import { BoxLabel, Checkbox, Radio } from './styles'
import { parseValue, serializeValue } from './utils'

function ChoiceInput(props) {
  const {
    schema,
    value,
    setField,
    validateField,
  } = props

  const {
    multiple,
    optionlist,
    serialization,
  } = schema.config

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

ChoiceInput.propTypes = {
  value: PropTypes.string,
  setField: PropTypes.func,
}

ChoiceInput.defaultProps = {
  value: '',
}

export default ChoiceInput
