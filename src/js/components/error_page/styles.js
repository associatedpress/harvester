import styled from 'styled-components'
import { bold } from 'js/styles/fonts'
import { primary, darkHighlight } from 'js/styles/colors'

export const ErrorContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const ErrorHeader = styled.div`
  font-family: ${bold};
  font-weight: bold;
  font-size: 1.8em;
  display: flex;
  align-items: baseline;
  margin-bottom: 0.4em;
`

export const ErrorStatus = styled.div`
  color: ${darkHighlight};
  margin-right: 0.4em;
`

export const ErrorTitle = styled.div`
  color: ${primary.dark};
`

export const ErrorBody = styled.div`
  color: ${primary.dark};
  font-family: ${bold};
  font-weight: bold;
  margin-bottom: 0.4em;
`

export const ErrorDetail = styled.div`
  color: #7c7c7c;
`
