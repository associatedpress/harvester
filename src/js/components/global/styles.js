import styled from 'styled-components'

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0.2em;
`

export const Label = styled.div`
  font-family: "Good Cond Bold", "Arial Narrow", Arial, sans-serif;
  margin-right: 1em;
  min-width: 120px;
`

export const Value = styled.div`
  flex-grow: 1;
`

export const Error = styled.span`
  color: #b42d26;
  margin-left: 12px;
`
