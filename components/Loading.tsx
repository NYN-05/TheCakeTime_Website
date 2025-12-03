import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  }

  return (
    <div
      className={`animate-spin rounded-full border-pink-600 border-t-transparent ${sizeClasses[size]} ${className}`}
    />
  )
}

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
      </div>
    </div>
  )
}

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

interface ButtonLoadingProps {
  loading: boolean
  children: React.ReactNode
  disabled?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  loading,
  children,
  disabled,
  className = '',
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative ${className} ${
        loading || disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="small" className="border-white" />
        </span>
      )}
      <span className={loading ? 'invisible' : ''}>{children}</span>
    </button>
  )
}

export default LoadingSpinner
