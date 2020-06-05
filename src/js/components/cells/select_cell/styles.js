import styled from 'styled-components'
import ReactSelect from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'

export const BasicSelect = styled(ReactSelect).attrs({ classNamePrefix: 'custom-select' })`
  .custom-select__value-container {
    height: 2.1em;
  }

  .custom-select__control {
    font-size: 0.8em;
    color: #727272;
    background-color: transparent;
    height: 1em;
    min-height: 2em;
    border: 1px solid #b5b5b5;
    border-radius: 0;
  }

  .custom-select__option {
    font-size: 0.8em;
    color: #727272;
  }

  .custom-select__control--is-focused {
    border-color: inherit;
    box-shadow: none;
  }

  .custom-select__input {
    font-size: 0.9em;
    color: #727272;
  }

  .custom-select__indicators {
    display: none;
  }
`

export const BasicCreatable = styled(ReactSelectCreatable).attrs({ classNamePrefix: 'custom-select' })`
  .custom-select__value-container {
    height: 2.1em;
  }

  .custom-select__control {
    font-size: 0.8em;
    color: #727272;
    background-color: transparent;
    height: 1em;
    min-height: 2em;
    border: 1px solid #b5b5b5;
    border-radius: 0;
  }

  .custom-select__option {
    font-size: 0.8em;
    color: #727272;
  }

  .custom-select__control--is-focused {
    border-color: inherit;
    box-shadow: none;
  }

  .custom-select__input {
    font-size: 0.9em;
    color: #727272;
  }

  .custom-select__indicators {
    display: none;
  }
`

export const Select = styled(BasicSelect)`
  width: 100%;
`

export const Creatable = styled(BasicCreatable)`
  width: 100%;
  max-width: 100%;
`
