import styled from 'styled-components'
import { darkPrimary, lightNeutral, neutral, darkerHighlight, highlight } from 'js/styles/colors'

export const Well = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: row-reverse;
`

const buttonColor = props => {
  if (props.disabled) return neutral
  if (props.primary) return darkerHighlight
  return darkPrimary
}

const buttonBackgroundColor = props => {
  if (props.disabled) return lightNeutral
  if (props.primary) return highlight
  return lightNeutral
}

export const Button = styled.button`
  appearance: none;
  border: none;
  text-transform: uppercase;
  background-color: ${buttonBackgroundColor};
  color: ${buttonColor};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 0.5em 0.7em;
`
