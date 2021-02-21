import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const formType = node.getAttribute('data-formtype')
const formId = node.getAttribute('data-formid')

render(
  <Provider store={store}>
    <App formType={formType} formId={formId} />
  </Provider>,
  document.getElementById('app')
)
