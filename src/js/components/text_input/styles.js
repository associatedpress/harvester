import styled from 'styled-components'

export const Input = styled.textarea`
  width: 100%;
  font-size: 0.9em;
  padding: 0;
  padding-left: 0.4em;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ebebeb;
  font-family: inherit;
  align-self: flex-start;
  margin-top: 0.2em;
  padding-top: 0.2em;
  display: block;
  resize: vertical;
  margin-bottom: 0.1em;

  &:hover {
    border-color: ${props => props.readOnly ? '#ebebeb' : '#aaa'};
  }

  &:focus {
    outline: ${props => props.readOnly ? 'none' : undefined};
  }
`
