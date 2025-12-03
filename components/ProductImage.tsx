import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export default function ProductImage({ src, alt, className, fill, width, height, priority }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  // If it's a placeholder URL or image failed to load, show colored box
  if (src.includes('placeholder.com') || imageError) {
    return (
      <div 
        className={`bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          position: fill ? 'absolute' : 'relative',
          inset: fill ? 0 : undefined
        }}
      >
        <span className="text-gray-700 font-semibold text-center p-4 text-sm">{alt}</span>
      </div>
    )
  }

  // Use real image
  return (
    <Image 
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setImageError(true)}
    />
  )
}
