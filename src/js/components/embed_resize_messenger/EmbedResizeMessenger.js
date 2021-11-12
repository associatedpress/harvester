import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function fireResizeMessage() {
  const height = document.documentElement.offsetHeight
  const data = {
    sentinel: 'amp',
    type: 'embed-size',
    height,
  }
  window.parent.postMessage(data, '*')
}

function EmbedResizeMessenger(props) {
  const {
    children,
  } = props

  const observer = useRef()

  useEffect(() => {
    observer.current = new window.ResizeObserver(() => {
      fireResizeMessage()
    })
    observer.current.observe(document.documentElement)
    return () => observer.current.disconnect()
  }, [])

  useEffect(() => {
    const handler = msg => {
      if (msg.type !== 'embed-size-query') return
      fireResizeMessage()
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <>{children}</>
  )
}

EmbedResizeMessenger.propTypes = {
  children: PropTypes.any,
}

EmbedResizeMessenger.defaultProps = {}

export default EmbedResizeMessenger
