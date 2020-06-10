import React from 'react'
import { render } from 'react-dom'
import App from './components'
import styled from 'styled-components'

import styles from 'scss/app.scss'

const StyledApp = styled(App)`${styles}`

const node = document.getElementById('app')
const docId = node.getAttribute('data-docid')

render(
  <StyledApp docId={docId} />,
  document.getElementById('app')
)
