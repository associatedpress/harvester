import React from 'react'
import { render } from 'react-dom'
import { SignInPage } from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const { formType, formId, buttons } = node.dataset

render(
  <SignInPage
    formType={formType}
    formId={formId}
    buttons={buttons && JSON.parse(buttons)}
  />,
  node
)
