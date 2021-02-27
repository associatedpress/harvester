import styled from 'styled-components'
import { primary, neutral } from 'js/styles/colors'

export const Well = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: row-reverse;
`

const buttonColor = props => {
  if (props.disabled) return neutral
  if (props.primary) return primary.light
  return primary.dark
}

const buttonBackgroundColor = props => {
  if (props.disabled) return primary.light
  if (props.primary) return primary.main
  return primary.light
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
