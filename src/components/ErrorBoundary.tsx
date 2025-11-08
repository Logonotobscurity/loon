import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

/**
 * An error boundary component to catch JavaScript errors anywhere in its child component tree.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to render.
 * @param {React.ComponentType<{ error: Error; resetError: () => void }>} [props.fallback] - A fallback component to render when an error is caught.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

/**
 * The default fallback component to render when an error is caught by the ErrorBoundary.
 *
 * @param {object} props - The properties for the component.
 * @param {Error} props.error - The error that was caught.
 * @param {Function} props.resetError - A function to reset the error state.
 * @returns {JSX.Element} The rendered default error fallback component.
 */
const DefaultErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ 
  error, 
  resetError 
}) => (
  <div className="error-boundary-fallback flex flex-col items-center justify-center min-h-screen bg-bg-dark-90 text-text-white p-8">
    <div className="text-center max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-red-400">Something went wrong</h2>
      <p className="text-text-white-70 mb-6">
        We encountered an unexpected error. Please try refreshing the page.
      </p>
      <details className="mb-6 bg-bg-dark-80 p-4 rounded-lg text-left">
        <summary className="cursor-pointer text-primary hover:text-primary-light">
          Error details
        </summary>
        <pre className="mt-2 text-sm text-text-white-60 overflow-auto">
          {error.message}
        </pre>
      </details>
      <button 
        onClick={resetError}
        className="px-6 py-3 bg-primary text-text-white rounded-lg hover:bg-primary-light transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);