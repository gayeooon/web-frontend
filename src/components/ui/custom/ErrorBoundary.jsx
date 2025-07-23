import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('에러:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset(); // 외부에서 전달받은 onReset 함수 호출
  };

  render() {
    const { hasError, error } = this.state;
    const { children, errorFallback: ErrorFallback } = this.props;

    if (hasError && error) {
      return (
        <ErrorFallback
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}
