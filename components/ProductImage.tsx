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

export default function ProductImage({ src, alt, className, fill, width, height, priority = false }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [loaded, setLoaded] = useState(false)

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

  // Use real image with optimizations
  return (
    <>
      {!loaded && (
        <div 
          className={`bg-gray-200 animate-pulse ${className}`}
          style={{ 
            width: fill ? '100%' : width, 
            height: fill ? '100%' : height,
            position: fill ? 'absolute' : 'relative',
            inset: fill ? 0 : undefined
          }}
        />
      )}
      <Image 
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        priority={priority}
        quality={priority ? 90 : 75}
        loading={priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
        onError={() => setImageError(true)}
        onLoad={() => setLoaded(true)}
        sizes={fill ? "100vw" : undefined}
      />
    </>
  )
}
