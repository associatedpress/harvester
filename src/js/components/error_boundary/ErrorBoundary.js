import React from 'react'
import PropTypes from 'prop-types'

const changedArray = (a = [], b = []) => {
  if (a.length !== b.length) return true
  return a.some((el, i) => !Object.is(el, b[i]))
}

const initialState = {
  error: null,
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  resetErrorBoundary(...args) {
    const { onReset } = this.props
    if (onReset) onReset(...args)
    this.reset()
  }

  reset() {
    this.setState({ ...initialState })
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props
    console.error(error, errorInfo)
    if (onError) onError(error, errorInfo)
  }

  componentDidUpdate(prevProps) {
    const { error } = this.state
    const { resetKeys } = this.props

    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      this.reset()
    }
  }

  render() {
    const { error } = this.state
    const {
      children,
      fallbackRender,
      FallbackComponent,
      fallback,
    } = this.props

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }

      // pre-rendered fallback
      if (fallback) return fallback

      // fallback render function
      if (typeof fallbackRender === 'function') return fallbackRender(props)

      // fallback component type
      if (FallbackComponent) return <FallbackComponent {...props} />

      // no fallback, render nothing
      return null
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  resetKeys: PropTypes.array,
  fallbackRender: PropTypes.func,
  fallback: PropTypes.any,
  FallbackComponent: PropTypes.element,
}

ErrorBoundary.defaultProps = {
  children: null,
}

export default ErrorBoundary
