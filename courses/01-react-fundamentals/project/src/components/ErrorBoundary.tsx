import { Component } from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-fallback">
          <p>Something went wrong. Please try again.</p>
          <button id="error-retry" onClick={this.handleRetry}>Retry</button>
        </div>
      )
    }
    return this.props.children
  }
}
