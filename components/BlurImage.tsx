"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ src, alt, className, imageClassName, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-gray-100/50 ${className || ''}`}>
      {/* Skeleton Shimmer Effect */}
      {isLoading && (
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
              backgroundColor: '#f3f4f6'
            }}
          ></div>
        </div>
      )}

      <Image
        alt={alt}
        src={src}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`
          object-cover
          duration-1000 ease-out
          ${imageClassName || ''}
          ${isLoading ? 'opacity-0 scale-105 blur-2xl' : 'opacity-100 scale-100 blur-0'}
        `}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default BlurImage;