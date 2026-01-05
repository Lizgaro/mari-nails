"use client";

import React, { useEffect, useState } from 'react';
import { X, Quote, Sparkles } from 'lucide-react';

interface EditorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: React.ReactNode;
}

const EditorialModal: React.FC<EditorialModalProps> = ({ isOpen, onClose, title, text }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setShow(true);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    } else {
        const timer = setTimeout(() => setShow(false), 500); // Sync with transition duration
        document.body.style.overflow = 'unset';
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 transition-all duration-700 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-700"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className={`
        bg-[#faf9f6] w-full max-w-lg md:rounded-2xl rounded-t-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative z-10 p-8 md:p-12
        flex flex-col items-center text-center border border-white/50
        transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)
        ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-95 opacity-0'}
      `}>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secret-hot to-transparent opacity-50"></div>
        
        <div className="mb-8 text-secret-hot/20 animate-pulse-slow">
            <Quote size={48} fill="currentColor" />
        </div>
        
        <h3 className="font-script text-4xl md:text-5xl text-vogue-black mb-6 transform -rotate-2 leading-tight">
            {title}
        </h3>
        
        <div className="flex items-center gap-4 mb-8 w-full justify-center">
            <div className="h-[1px] w-12 bg-secret-hot/30"></div>
            <Sparkles size={12} className="text-secret-hot" />
            <div className="h-[1px] w-12 bg-secret-hot/30"></div>
        </div>

        <div className="font-serif text-lg md:text-xl italic text-gray-700 leading-relaxed font-light mb-10">
            {text}
        </div>

        <button 
            onClick={onClose}
            className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-vogue-black hover:text-white hover:border-vogue-black transition-all duration-500 group"
        >
            <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500"/>
        </button>
      </div>
    </div>
  );
};

export default EditorialModal;