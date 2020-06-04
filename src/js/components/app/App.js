import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Flex, Headline, Chatter, Footer } from 'ap-react-components'
import { initGA, PageView } from 'interact-analytics'

function App(props) {
  const {
    className,
  } = props

  useEffect(() => {
    initGA('UA-19104461-7')
    PageView()
  }, [])

  return (
    <Flex.Interactive className={className}>
      <Flex.Static>
        <Headline>Protest Arrests Data Entry</Headline>
        <Chatter>
          This instrument can teach, it can illuminate; yes, and even it can
          inspire. But it can do so only to the extent that humans are
          determined to use it to those ends. Otherwise, it's nothing but wires
          and lights in a box.
        </Chatter>
      </Flex.Static>
      <Flex.Fill>
      </Flex.Fill>
      <Flex.Static>
        <Footer
          credit='The Data Team'
        />
      </Flex.Static>
    </Flex.Interactive>
  )
}

App.propTypes = {
  className: PropTypes.string,
}

App.defaultProps = {}

export default App
