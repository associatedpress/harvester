import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Creatable } from './styles'
import { useData } from 'ap-react-hooks'

function SelectInput(props) {
  const {
    onChange,
    value,
    values,
    options,
    creatable,
    requires,
    keys,
    docId,
  } = props

  const reqId = requires && keys[requires]
  const reqVal = values[reqId]
  const q = new URLSearchParams({ [requires]: reqVal })
  const url = reqVal ? `/api/${docId}/sheet/${options.range}?${q}` : undefined
  const requireOpts = useData(url, { initial: [] })

  useEffect(() => {
    onChange(null)
  }, [reqVal])

  const opts = requires ? requireOpts : options.options

  const getLabel = opt => opt.label || opt.value
  const selected = opts.find(opt => opt.value === value)

  const C = creatable ? Creatable : Select

  return (
    <C
      value={selected || null}
      options={opts}
      getOptionLabel={getLabel}
      getNewOptionData={value => ({ value })}
      isClearable
      onChange={opt => onChange(opt && opt.value)}
    />
  )
}

SelectInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.object,
  creatable: PropTypes.bool,
}

SelectInput.defaultProps = {
  creatable: false,
}

export default SelectInput
