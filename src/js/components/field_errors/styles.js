import styled from 'styled-components'
import { darkHighlight } from 'js/styles/colors'

export const Container = styled.div`
  border-left: 3px solid ${props => props.hasError ? darkHighlight : '#fff'};
  padding-left: 0.4em;
  margin-bottom: 1em;
`

export const Message = styled.div`
  color: ${darkHighlight};
  font-size: 0.8em;
  margin-top: 0.4em;
`
