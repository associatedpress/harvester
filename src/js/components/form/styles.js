import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 12px;
`

export const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;
`

export const THead = styled.thead`
  font-family: "Good Cond Bold", "Arial Narrow", Arial, sans-serif;

  th {
    vertical-align: bottom;
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    text-align: inherit;
  }
`

export const Help = styled.span`
  &::before {
    content: 'i';
    font-size: 0.7em;
    color: #aaa;
    vertical-align: top;
    width: 1em;
    height: 1em;
    border: 1px solid #aaa;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    margin-left: 0.3em;
    cursor: help;
  }
`

export const TBody = styled.tbody`
  th, td {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
`

export const Button = styled.button`
  text-transform: uppercase;
  padding: 0.75em;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
`

export const NewRowButton = styled(Button)`
  float: left;
`

export const SubmitButton = styled(Button)`
  float: right;
  background-color: #117da5;
  border-color: #117da5;
  color: #fff;
`
