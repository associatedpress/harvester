import styled from 'styled-components'
import { copy } from 'js/styles/fonts'
import { darkPrimary, lightHighlight, errorColor, confirmColor } from 'js/styles/colors'

export const Notes = styled.div`
  position: fixed;
  top: 3em;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${copy};
`

export const Note = styled.div`
  background-color: ${props => props.type === 'error' ? errorColor : confirmColor};
  color: ${darkPrimary};
  margin-bottom: 0.2em;
  padding: 0.2em 1em;
  border-radius: 3px;
`
