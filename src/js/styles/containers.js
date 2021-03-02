import styled from 'styled-components'
import { copy as copyFont } from 'js/styles/fonts'
import { copy as copyColor, primary } from 'js/styles/colors'

export const gridGap = `
  grid-gap: 0.75rem;

  @media (min-width: 22.5rem) {
    grid-gap: 1rem;
  }

  @media (min-width: 30rem) {
    grid-gap: 1rem;
  }

  @media (min-width: 37.5rem) {
    grid-gap: 1rem;
  }

  @media (min-width: 45rem) {
    grid-gap: 1rem;
  }

  @media (min-width: 60rem) {
    grid-gap: 1.5rem;
  }

  @media (min-width: 64rem) {
    grid-gap: 1.5rem;
  }

  @media (min-width: 80rem) {
    grid-gap: 1.5rem;
  }

  @media (min-width: 90rem) {
    grid-gap: 1.5rem;
  }
`

export const gridPadding = `
  padding: 0 1rem;

  @media (min-width: 22.5rem) {
    padding: 0 1rem;
  }

  @media (min-width: 30rem) {
    padding: 0 1.5rem;
  }

  @media (min-width: 37.5rem) {
    padding: 0 var(--ap-logo-size);
  }

  @media (min-width: 45rem) {
    padding: 0 var(--ap-logo-size);
  }

  @media (min-width: 60rem) {
    padding: 0 var(--ap-logo-size);
  }

  @media (min-width: 64rem) {
    padding: 0 var(--ap-logo-size);
  }

  @media (min-width: 80rem) {
    padding: 0 var(--ap-logo-size);
  }

  @media (min-width: 90rem) {
    padding: 0 var(--ap-logo-size);
  }
`

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  color: ${primary.dark};
  font-family: ${copyFont};
  ${gridGap}
  ${gridPadding}
`

export const Article = styled.article`
  display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(var(--ap-logo-size), 1fr));
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  color: ${copyColor};
  ${gridGap}
`
