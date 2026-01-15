import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#fff', 
          color: '#333', 
          height: '100vh', 
          overflow: 'auto',
          zIndex: 9999,
          position: 'relative'
        }}>
          <h2 style={{ color: '#d9534f' }}>시스템 오류가 발생했습니다.</h2>
          <p>아래 에러 내용을 확인해주세요:</p>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1rem', 
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            margin: '1rem 0'
          }}>
            <p style={{ color: '#c7254e', fontWeight: 'bold' }}>
              {this.state.error && this.state.error.toString()}
            </p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            페이지 새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
