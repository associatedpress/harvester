import styled from 'styled-components'
import { bold } from 'js/styles/fonts'
import { lightHighlight, darkPrimary } from 'js/styles/colors'

export const Nav = styled.nav`
  background-color: ${darkPrimary};
  padding: 0.4rem 1rem;
  font-size: 1.8em;
  margin-bottom: 1em;
`

export const Brand = styled.div`
  font-family: ${bold};
  color: ${lightHighlight};
`
