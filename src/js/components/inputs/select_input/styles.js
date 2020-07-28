import styled from 'styled-components'
import ReactSelect from 'react-select'
import ReactSelectCreatable from 'react-select/creatable'

export const BasicSelect = styled(ReactSelect).attrs({ classNamePrefix: 'custom-select' })`
  .custom-select__value-container {
    height: 2.1em;
  }

  .custom-select__control {
    font-size: 0.9em;
    color: #727272;
    background-color: transparent;
    height: 1em;
    min-height: 2em;
    border: none;
    border-bottom: 1px solid #ebebeb;
    border-radius: 0;
  }

  .custom-select__option {
    font-size: 0.9em;
    color: #727272;
  }

  .custom-select__option--is-selected {
    background-color: #ebebeb;
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
    font-size: 0.9em;
    color: #727272;
    background-color: transparent;
    height: 1em;
    min-height: 2em;
    border: none;
    border-bottom: 1px solid #ebebeb;
    border-radius: 0;
  }

  .custom-select__option {
    font-size: 0.9em;
    color: #727272;
  }

  .custom-select__option--is-selected {
    background-color: #ebebeb;
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

export const BoxLabel = styled.span`
  margin-left: 0.2em;
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  font-size: 0.9em;
  padding: 0;
  padding-left: 0.4em;
  box-sizing: border-box;
  font-family: inherit;
`

export const Radio = styled.input.attrs({ type: 'radio' })`
  font-size: 0.9em;
  padding: 0;
  padding-left: 0.4em;
  box-sizing: border-box;
  font-family: inherit;
`
