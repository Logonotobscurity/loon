import * as Sentry from '@sentry/react';
import React from 'react';

interface ErrorButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const ErrorButton: React.FC<ErrorButtonProps> = ({
  className = '',
  variant = 'danger',
  size = 'md',
}) => {
  const handleError = () => {
    // Create a test error to verify Sentry integration
    throw new Error('This is your first error! - Sentry test error');
  };

  const handleManualError = () => {
    // Manually capture an error with additional context
    Sentry.captureException(new Error('Manual error with context'), {
      extra: {
        component: 'ErrorButton',
        action: 'manual_error_trigger',
        timestamp: new Date().toISOString(),
      },
    });
  };

  const handleMessage = () => {
    // Send a message to Sentry
    Sentry.captureMessage('Test message from ErrorButton', {
      level: 'info',
      tags: {
        component: 'ErrorButton',
        type: 'test_message',
      },
    });
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const baseClasses = 'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900">Sentry Error Testing</h3>
      <p className="text-sm text-gray-600">
        These buttons help test Sentry error tracking. Use in development only.
      </p>
      
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleError}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        >
          Throw Test Error
        </button>
        
        <button
          onClick={handleManualError}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses['secondary']} ${className}`}
        >
          Manual Error
        </button>
        
        <button
          onClick={handleMessage}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses['primary']} ${className}`}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

// Higher-order component for error boundaries
export const withSentryErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return Sentry.withErrorBoundary(Component, {
    fallback: ({ error, resetError }) => (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-lg font-semibold text-red-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-700 mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    ),
  });
};

// Hook for Sentry performance monitoring
export const useSentryPerformance = () => {
  const startTransaction = (name: string, operation: string) => {
    return Sentry.startTransaction({ name, op: operation });
  };

  const startSpan = (transaction: any, name: string, operation: string) => {
    return transaction.startChild({ op: operation, description: name });
  };

  const finishSpan = (span: any) => {
    span.finish();
  };

  const finishTransaction = (transaction: any) => {
    transaction.finish();
  };

  return {
    startTransaction,
    startSpan,
    finishSpan,
    finishTransaction,
  };
};