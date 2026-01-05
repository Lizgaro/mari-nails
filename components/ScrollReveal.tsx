"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: 'fade-in' | 'slide-up' | 'bloom';
    delay?: number; // in seconds
    duration?: number; // in seconds
    className?: string;
    threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    variant = 'slide-up',
    delay = 0,
    duration = 1,
    className = '',
    threshold = 0.1
}) => {
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
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [threshold]);

    const getTransform = () => {
        if (isVisible) return 'translateY(0) scale(1)';
        switch (variant) {
            case 'slide-up': return 'translateY(40px)';
            case 'bloom': return 'scale(0.95)';
            default: return 'translateY(0)';
        }
    };

    const getFilter = () => {
        if (isVisible) return 'blur(0px)';
        return variant === 'bloom' ? 'blur(10px)' : 'blur(0px)';
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                filter: getFilter(),
                transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${delay}s`,
                willChange: 'opacity, transform'
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;