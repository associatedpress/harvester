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

export const FlexInteractive = styled.div`
  font-family: 'Good Cond Regular', Arial, sans-serif;
  color: #2c2c2c;
  display: flex;
  flex-direction: column;
  height: calc(100% - 8px);
  width: calc(100% - 8px);
  padding: 4px;
`

export const FlexStatic = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: content;
`

export const H1 = styled.h1`
  font-family: 'Good Cond Bold', Arial, sans-serif;
  line-height: 1.3;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
  font-size: 1.2em;
  text-transform: uppercase;

  @media screen and(min-width: 580px) {
    font-size: 1.4em;
  }

  @media screen and (min-width: 720px) {
    font-size: 1.8em;
  }
`

export const Chatter = styled.div`
  line-height: 1.3;
  margin-top: 0.2em;
  margin-bottom: 0.4em;
  color: #4d4d4e;
  font-size: 0.8em;

  @media screen and (min-width: 580px) {
    font-size: 0.9em;
  }

  @media screen and (min-width: 720px) {
    font-size: 1em;
  }
`

export const NavButton = styled.div`
  text-transform: uppercase;
  float: right;
  cursor: pointer;
`
