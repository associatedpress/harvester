import React from 'react'
import { render } from 'react-dom'
import App from './components'
import styled from 'styled-components'

import styles from 'scss/app.scss'

const StyledApp = styled(App)`${styles}`

render(
  <StyledApp />,
  document.getElementById('app')
)
