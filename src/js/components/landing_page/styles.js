import styled from 'styled-components'
import { copy, bold } from 'js/styles/fonts'
import { primary } from 'js/styles/colors'
import { gridPadding } from 'js/styles/containers'

export const Container = styled.main`
  background-color: ${primary.dark};
  color: ${primary.midlight};
  ${gridPadding}
  font-family: ${copy};
`

export const Hero = styled.div`
  height: 100vh;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  a {
    color: ${primary.main};

    &:hover {
      color: ${primary.light};
      border-color: ${primary.light};
    }
  }
`

export const Title = styled.h1`
  color: ${primary.light};
  font-family: ${bold};
  font-weight: bold;
  font-size: 2.6em;
`

export const Description = styled.div`
`

export const ButtonLink = styled.a`
  margin-top: 2em;
  padding: 1em 2em;
  border: 1px solid ${primary.main};
  text-decoration: none;
`
