import React from 'react'
import { render } from 'react-dom'
import { ErrorPage } from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const { props } = node.dataset
render(<ErrorPage {...JSON.parse(props)} />, node)
