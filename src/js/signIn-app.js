import React from 'react'
import { render } from 'react-dom'
import { SignInPage } from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const { props } = node.dataset
render(<SignInPage {...JSON.parse(props)} />, node)
