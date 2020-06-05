import styled from 'styled-components'
import { BasicSelect } from 'js/components/cells/select_cell/styles'

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
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

export const TBody = styled.tbody`
  th, td {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
`

export const Label = styled.div`
  display: inline-block;
  font-family: "Good Cond Bold", "Arial Narrow", Arial, sans-serif;
  margin-right: 8px;
  min-width: 2em;
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

export const Error = styled.span`
  color: #b42d26;
  margin-left: 12px;
`

export const Select = styled(BasicSelect)`
  display: inline-block;
  min-width: 7.2em;
`
