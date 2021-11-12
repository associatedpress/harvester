import styled from 'styled-components'
import { lightNeutral } from 'js/styles/colors'

const TextBlock = styled.div`
  p {
    margin-block-start: 1em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  hr {
    border: none;
    width: 100%;
    max-width: 400px;
    height: 4px;
    margin: 2em auto;
    background-color: ${lightNeutral};
  }
`

export default TextBlock
