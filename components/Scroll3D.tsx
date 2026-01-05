"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Scroll3DProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const Scroll3D: React.FC<Scroll3DProps> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'perspective(1200px) rotateX(0deg) translateY(0) scale(1)' 
          : 'perspective(1200px) rotateX(15deg) translateY(80px) scale(0.92)',
        transformOrigin: '50% 20%',
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default Scroll3D;