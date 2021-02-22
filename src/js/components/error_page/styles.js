import styled from 'styled-components'
import { bold } from 'js/styles/fonts'

export const ErrorContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const ErrorHeader = styled.div`
  font-family: ${bold};
  font-size: 1.8em;
  display: flex;
  align-items: baseline;
  margin-bottom: 0.4rem;
`

export const ErrorStatus = styled.div`
  color: #7c7c7c;
  margin-right: 0.4em;
`

export const ErrorTitle = styled.div`
`

export const ErrorBody = styled.div`
  font-family: ${bold};
`

export const ErrorDetail = styled.div`
  color: #7c7c7c;
`
