import React, { useState, useEffect, useRef } from 'react'
import { Center, Message } from './styles'

function Loading(props) {
  const s = 'LOADING'
  const timer = useRef()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const incr = () => setTick((tick + 1) % (s.length + 3))
    timer.current = setTimeout(incr, 200)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  })

  return (
    <Center>
      <Message style={{ visibility: tick === 0 ? 'hidden' : undefined }}>
        {tick === 0 ? s : s.slice(0, tick)}
      </Message>
    </Center>
  )
}

Loading.propTypes = {}

Loading.defaultProps = {}

export default Loading
