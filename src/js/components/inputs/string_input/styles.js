import styled from 'styled-components'

export const Input = styled.input.attrs({ type: 'text' })`
  width: 100%;
  height: 2.1em;
  font-size: 0.9em;
  padding: 0;
  padding-left: 0.4em;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ebebeb;
  font-family: inherit;

  &:hover {
    border-color: ${props => props.readOnly ? '#ebebeb' : '#aaa'};
  }

  &:focus {
    outline: ${props => props.readOnly ? 'none' : undefined};
  }
`
