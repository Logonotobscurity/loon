import React from 'react';

/**
 * A simple loading spinner component.
 *
 * @returns {JSX.Element} The rendered loading spinner.
 */
export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

/**
 * A full-page loading indicator with a "Loading..." message.
 *
 * @returns {JSX.Element} The rendered full-page loading indicator.
 */
export const PageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-text-white-60">Loading...</p>
      </div>
    </div>
  );
};