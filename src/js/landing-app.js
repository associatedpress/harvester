import React from 'react'
import { render } from 'react-dom'
import { LandingPage } from './components'
import 'scss/app.scss'

const node = document.getElementById('app')

render(<LandingPage />, node)
