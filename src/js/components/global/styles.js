import styled from 'styled-components'

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0.2em;
  min-height: 2.2em;
`

export const Label = styled.div`
  margin-right: 1em;
  min-width: 120px;
  padding-top: 0.2em;
  align-self: center;
`

export const Value = styled.div`
  flex-grow: 1;
`

export const Error = styled.span`
  color: #b42d26;
  margin-left: 12px;
`
