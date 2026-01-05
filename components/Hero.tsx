"use client";

import React from 'react';
import Image from 'next/image';
const Hero: React.FC = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden text-white bg-transparent">

      {/* Background Image Layer - High Fashion Style */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-vogue-wide.png"
          alt="Vogue Style Manicure Editorial 2026"
          fill
          priority
          quality={95}
          className="object-cover opacity-60 scale-105 animate-pulse-slow will-change-transform"
          style={{ animationDuration: '20s' }}
        />
        {/* Editorial Gradients for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10"></div>

        {/* Darker Gradient Overlay for Depth - Vogue Style Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none mix-blend-multiply"></div>
      </div>



      {/* Main Content Centered */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow text-center px-4 mt-10">

        {/* Title */}
        <div className="relative group cursor-default select-none perspective-1000">
          {/* Signature effect - Refined Editorial Style with subtle tilt */}
          <span className="absolute -top-6 -right-2 md:-top-10 md:-right-16 font-script text-3xl md:text-5xl text-secret-pink/90 transform -rotate-6 z-30 drop-shadow-lg opacity-0 animate-bloom mix-blend-screen pointer-events-none tracking-wide" style={{ animationDelay: '1.5s' }}>
            Эстетика
          </span>

          <h1 className="flex flex-col items-center justify-center relative z-10 leading-[0.75]">
            {/* Solid Top Text - Vogue Style with Enhanced Bloom and Reveal */}
            <span
              className="font-serif text-[18vw] md:text-[13rem] font-medium uppercase tracking-[-0.05em] italic will-change-transform bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-bloom"
              style={{
                animationDelay: '0.1s',
              }}
            >
              Mari
            </span>

            {/* Hollow/Outline Bottom Text - Dynamic Glow & Float with Shimmer */}
            <span
              className="font-serif text-[18vw] md:text-[13rem] font-light text-transparent uppercase tracking-[-0.05em] italic transform -translate-y-2 md:-translate-y-8 transition-all duration-1000 ease-out hover:text-white/5 animate-bloom will-change-transform"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.9)',
                textShadow: '0 0 30px rgba(219,39,119,0.3)',
                animationDelay: '0.4s'
              }}
            >
              Nails
            </span>
          </h1>
        </div>

        {/* Editorial Copy */}
        <div className="mt-8 max-w-xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.8s' }}>
          <p className="font-serif text-xl md:text-2xl font-light italic leading-relaxed text-white/90 mb-8 drop-shadow-lg tracking-wide">
            &quot;Мы раскрываем вашу природную грацию через призму высокого стиля.&quot;
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-4 animate-slide-up opacity-0" style={{ animationDelay: '1s' }}>
          <button
            onClick={scrollToBooking}
            className="relative inline-flex group items-center justify-center overflow-hidden rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(219,39,119,0.5)] transition-shadow duration-500 border border-white/20 backdrop-blur-sm"
          >
            <div className="absolute inset-0 w-full h-full bg-white group-hover:bg-secret-hot transition-colors duration-500"></div>
            <div className="relative px-12 py-5 text-[10px] md:text-xs font-bold text-black group-hover:text-white transition-colors duration-200 font-sans uppercase tracking-[0.25em]">
              Забронировать Визит
            </div>
          </button>
        </div>

      </div>

      {/* Marquee Footer - Translated */}
      <div className="relative z-20 w-full py-4 bg-black/40 backdrop-blur-md text-white overflow-hidden border-t border-white/10 mt-auto">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6 opacity-70">
              <span className="font-serif italic text-2xl text-white font-light">Грация</span>
              <span className="w-1.5 h-1.5 bg-secret-hot rounded-full"></span>
              <span className="font-serif italic text-2xl text-white font-light">Искусство</span>
              <span className="w-1.5 h-1.5 bg-secret-hot rounded-full"></span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Идеальный Маникюр</span>
              <span className="w-1.5 h-1.5 bg-secret-hot rounded-full"></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Hero;