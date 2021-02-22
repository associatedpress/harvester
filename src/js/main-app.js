import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const { props } = node.dataset

render(
  <Provider store={store}>
    <App {...JSON.parse(props)} />
  </Provider>,
  document.getElementById('app')
)
