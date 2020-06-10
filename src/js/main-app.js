import React from 'react'
import { render } from 'react-dom'
import App from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const docId = node.getAttribute('data-docid')

render(
  <App docId={docId} />,
  document.getElementById('app')
)
