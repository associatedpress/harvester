import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const docId = node.getAttribute('data-docid')

render(
  <Provider store={store}>
    <App docId={docId} />
  </Provider>,
  document.getElementById('app')
)
