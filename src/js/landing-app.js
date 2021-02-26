import React from 'react'
import { render } from 'react-dom'
import { LandingPage } from './components'
import 'scss/app.scss'

const node = document.getElementById('app')
const { props } = node.dataset
render(<LandingPage {...JSON.parse(props)} />, node)
