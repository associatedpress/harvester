import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Select, Creatable, Checkbox, Radio, BoxLabel } from './styles'
import { useData } from 'ap-react-hooks'
import { DocContext } from 'js/components'
import * as CSV from 'csv-string'

function SelectInput(props) {
  const {
    rowId,
    colId,
    onChange,
    value,
    values,
    options,
    optionlist,
    creatable,
    multiple,
    serialization,
    requires,
    keys,
    readOnly,
  } = props

  const docId = useContext(DocContext)

  const reqId = requires && keys[requires]
  const reqVal = values[reqId]
  const q = new URLSearchParams({ [requires]: reqVal })
  const url = reqVal ? `/api/${docId}/sheet/${options.range}?${q}` : undefined
  const requireOpts = useData(url, { initial: [] })

  useEffect(() => {
    if (!readOnly) {
      onChange()
    }
  }, [reqVal])

  const serialize = val => {
    if (multiple) {
      const serializers = {
        csv: CSV.stringify,
        json: JSON.stringify,
      }
      const fn = serializers[serialization] || serializers.csv
      return val && fn(val.map(v => v.value)).trim()
    }
    return val && val.value
  }

  const parse = val => {
    if (multiple) {
      const parsers = {
        csv: v => CSV.parse(v)[0],
        json: JSON.parse,
      }
      const fn = parsers[serialization] || parsers.csv
      return val ? fn(val) : []
    }
    return val
  }

  const parsedValue = parse(value)

  const listOptions = optionlist && optionlist.map(value => ({ value }))
  const opts = listOptions || (requires ? requireOpts : options.options)

  const getLabel = opt => opt.label || opt.value
  const selected = multiple
    ? opts.filter(opt => parsedValue.includes(opt.value))
    : opts.find(opt => opt.value === parsedValue)

  if (optionlist) {
    const C = multiple ? Checkbox : Radio
    const isChecked = value => {
      if (!selected) {
        return false
      }
      if (multiple) {
        return selected.map(o => o.value).includes(value)
      }
      return selected.value === value
    }
    const handleChange = (opt, alreadyChecked) => {
      let newSelected
      if (multiple) {
        newSelected = alreadyChecked
          ? selected.filter(o => o.value !== opt.value)
          : [...selected, opt]
      } else {
        newSelected = alreadyChecked ? null : opt
      }
      onChange(serialize(newSelected))
    }
    return (
      <>
        {opts.map((opt, i) => (
          <div key={i}>
            <C
              name={`select-${rowId}-${colId}`}
              checked={isChecked(opt.value)}
              onChange={() => handleChange(opt, isChecked(opt.value))}
              readOnly={readOnly}
              onClick={multiple ? undefined : () => {
                if (isChecked(opt.value)) {
                  handleChange(opt, true)
                }
              }}
            />
            <BoxLabel>{opt.value}</BoxLabel>
          </div>
        ))}
      </>
    )
  }

  const C = creatable ? Creatable : Select

  return (
    <C
      value={selected || null}
      options={opts}
      getOptionLabel={getLabel}
      getNewOptionData={value => ({ value })}
      isClearable
      isMulti={multiple}
      readOnly={readOnly}
      isDisabled={readOnly}
      onChange={opt => onChange(opt && serialize(opt))}
    />
  )
}

SelectInput.propTypes = {
  rowId: PropTypes.any,
  colId: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  options: PropTypes.object,
  optionlist: PropTypes.array,
  creatable: PropTypes.bool,
  multiple: PropTypes.bool,
  serialization: PropTypes.string,
}

SelectInput.defaultProps = {
  rowId: 'global',
  creatable: false,
  multiple: false,
  serialization: 'csv',
}

export default SelectInput
