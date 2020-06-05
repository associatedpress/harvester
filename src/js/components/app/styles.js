import styled from 'styled-components'

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
