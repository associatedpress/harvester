import styled from 'styled-components'
import { darkPrimary, lightNeutral, neutral, darkerHighlight, highlight } from 'js/styles/colors'

export const RelativeContainer = styled.div`
  margin: 1em 0;
  border: 2px solid #ececec;
  padding: 0.2em 0.2em 0.2em 0;
  display: flex;
`

export const Form = styled.div`
  flex-grow: 1;
`

export const Controls = styled.div`
  display: flex;
  justify-content: center;
`

export const Button = styled.button`
  appearance: none;
  border: none;
  text-transform: uppercase;
  padding: 0.5em 0.7em;
  margin-left: 0.2em;
  cursor: pointer;
`

export const NewButton = styled(Button)`
`

export const DestroyButton = styled(Button)`
  color: ${darkerHighlight};
`
