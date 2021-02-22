import React from 'react'
import { render } from 'react-dom'
import { ErrorPage } from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const { status, message } = node.dataset

render(
  <ErrorPage status={+status} message={message} />,
  node
)
