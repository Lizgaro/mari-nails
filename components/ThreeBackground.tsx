"use client";

import React, { useEffect, useRef } from 'react';

const ThreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };
    updateSize();

    // --- PARTICLES ---
    const particles: Particle[] = [];
    const particleCount = 140; // Balanced count for performance and aesthetics

    class Particle {
      x: number;
      y: number;
      z: number;
      initialX: number;
      initialY: number;
      radius: number;
      color: string;
      speedZ: number;

      constructor() {
        // Spread particles wider to cover parallax movement
        this.initialX = (Math.random() - 0.5) * width * 1.5;
        this.initialY = (Math.random() - 0.5) * height * 1.5;
        this.x = this.initialX;
        this.y = this.initialY;
        this.z = Math.random() * width;
        
        // --- DYNAMIC PARTICLE LOGIC ---
        // We create a mix of "Dust" (Small/Fast) and "Bokeh" (Large/Slow)
        const typeRandom = Math.random();

        if (typeRandom > 0.8) {
            // TYPE: LARGE BOKEH (Slower, Ambient)
            // Radius: 4px - 8px
            this.radius = Math.random() * 4 + 4; 
            // Speed: Very Slow (0.1 - 0.4)
            this.speedZ = Math.random() * 0.3 + 0.1;
            
            // Colors: Very subtle, low opacity for background feel
            const tints = [
                'rgba(219, 39, 119, 0.08)', // Secret Pink (Very Faint)
                'rgba(212, 175, 55, 0.08)',  // Vogue Gold (Very Faint)
                'rgba(200, 200, 200, 0.05)'  // White Mist
            ];
            this.color = tints[Math.floor(Math.random() * tints.length)];

        } else if (typeRandom > 0.4) {
            // TYPE: MEDIUM FLOATERS
            // Radius: 1.5px - 3.5px
            this.radius = Math.random() * 2 + 1.5;
            // Speed: Medium (0.5 - 1.5)
            this.speedZ = Math.random() * 1.0 + 0.5;

             const tints = [
                'rgba(219, 39, 119, 0.15)', // Secret Pink
                'rgba(212, 175, 55, 0.15)',  // Vogue Gold
                'rgba(180, 180, 180, 0.12)'  // Grey
            ];
            this.color = tints[Math.floor(Math.random() * tints.length)];

        } else {
            // TYPE: FAST DUST (Energetic)
            // Radius: 0.5px - 1.5px
            this.radius = Math.random() * 1 + 0.5;
            // Speed: Fast (2.0 - 4.0)
            this.speedZ = Math.random() * 2 + 2;

            // Colors: Slightly higher opacity to be visible as sparks
             const tints = [
                'rgba(219, 39, 119, 0.3)', // Secret Pink (Visible)
                'rgba(212, 175, 55, 0.3)',  // Vogue Gold (Visible)
                'rgba(255, 255, 255, 0.4)'  // White Spark
            ];
            this.color = tints[Math.floor(Math.random() * tints.length)];
        }
      }

      update() {
        this.z -= this.speedZ;
        
        // Reset when passing camera
        if (this.z <= 0) {
          this.z = width;
          this.x = (Math.random() - 0.5) * width * 1.5;
          this.y = (Math.random() - 0.5) * height * 1.5;
        }
        
        // Parallax calculation
        // Deeper particles move less with mouse than closer ones (handled by perspective division)
        // However, we also add a slight offset based on mouse position
        const parallaxX = -mouseRef.current.x * 40; 
        const parallaxY = mouseRef.current.y * 40;
        
        this.x = this.initialX + parallaxX;
        this.y = this.initialY + parallaxY;
      }

      draw() {
        const focalLength = 600;
        // Standard perspective projection
        const scale = focalLength / (focalLength + this.z);
        const x2d = this.x * scale + width / 2;
        const y2d = this.y * scale + height / 2;
        const radius2d = Math.max(0, this.radius * scale);

        ctx!.beginPath();
        ctx!.fillStyle = this.color;
        ctx!.arc(x2d, y2d, radius2d, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // --- STYLIZED 3D NAIL SILHOUETTE ---
    class NailSilhouette {
        cx: number;
        cy: number;
        angle: number;

        constructor() {
            this.cx = width * 0.85;
            this.cy = height * 0.85;
            this.angle = 0;
        }

        draw(time: number) {
            this.angle += 0.003; // Slower rotation for luxury feel
            const floatY = Math.sin(time * 0.0008) * 20; // Slower float
            
            ctx!.save();
            ctx!.translate(this.cx, this.cy + floatY);
            ctx!.rotate(Math.PI / 8 + Math.sin(this.angle) * 0.05); // Tilt
            ctx!.scale(3, 3); // Make it large

            // Draw Nail Shape (Stiletto/Almond)
            ctx!.beginPath();
            ctx!.moveTo(0, 0); // Bottom center base
            // Right curve to tip
            ctx!.bezierCurveTo(25, -20, 15, -120, 0, -150); 
            // Left curve back to base
            ctx!.bezierCurveTo(-15, -120, -25, -20, 0, 0); 
            ctx!.closePath();

            // Gradient Fill for "3D" look (pseudo-lighting)
            const grad = ctx!.createLinearGradient(-30, -75, 30, -75);
            grad.addColorStop(0, 'rgba(219,39,119,0.01)'); // Shadow edge
            grad.addColorStop(0.3, 'rgba(255,255,255,0.03)'); // Highlight
            grad.addColorStop(0.5, 'rgba(255,255,255,0.12)'); // Main Highlight (ridge)
            grad.addColorStop(0.7, 'rgba(255,255,255,0.03)'); // Highlight
            grad.addColorStop(1, 'rgba(219,39,119,0.01)'); // Shadow edge
            
            ctx!.fillStyle = grad;
            ctx!.fill();
            
            // Subtle Stroke for definition
            ctx!.strokeStyle = 'rgba(219,39,119,0.08)';
            ctx!.lineWidth = 0.5;
            ctx!.stroke();

            // Add a "Reflection" line
            ctx!.beginPath();
            ctx!.moveTo(-5, -30);
            ctx!.quadraticCurveTo(-2, -90, 0, -110);
            ctx!.strokeStyle = 'rgba(255,255,255,0.08)';
            ctx!.lineWidth = 2;
            ctx!.stroke();

            ctx!.restore();
        }
    }

    const nail = new NailSilhouette();

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 16;
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw the foreground nail
      nail.draw(time);

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-white overflow-hidden">
        {/* Subtle noise texture for editorial feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default ThreeBackground;