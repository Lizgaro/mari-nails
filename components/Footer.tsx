"use client";

import React, { useState } from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import EditorialModal from './EditorialModal';

const Footer: React.FC = () => {
    const [isVisionOpen, setIsVisionOpen] = useState(false);

    return (
        <>
            <footer className="bg-vogue-black text-white pt-20 pb-10 px-6 mt-0 relative overflow-hidden">
                {/* Secret BG Element */}
                <div className="absolute top-0 right-0 font-script text-[20rem] text-white/5 leading-none pointer-events-none -translate-y-1/3 translate-x-1/4">
                    Future
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left relative z-10">

                    <div className="md:col-span-2">
                        <ScrollReveal variant="fade-in" delay={0.1}>
                            <h2 className="font-serif text-5xl italic mb-6">Mari Nails.</h2>
                            <p className="font-sans font-light text-sm text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
                                Пространство красоты, где качество встречается с эстетикой. Мы заботимся о вашем здоровье и создаем стиль, актуальный в любом возрасте.
                            </p>
                            <div className="mt-8">
                                <button
                                    onClick={() => setIsVisionOpen(true)}
                                    className="font-serif italic text-lg text-gray-500/80 inline-block tracking-widest opacity-70 hover:text-secret-hot hover:opacity-100 transition-all duration-300 cursor-pointer"
                                >
                                    The Future is in Your Hands.
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div>
                        <ScrollReveal variant="slide-up" delay={0.3}>
                            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] mb-6 text-secret-hot">Меню</h4>
                            <div className="space-y-2 flex flex-col items-center md:items-start text-sm text-gray-400 font-sans">
                                <a href="#booking-section" className="hover:text-white transition-colors">Услуги и цены</a>
                                <a href="#booking-section" className="hover:text-white transition-colors">Сертификаты</a>
                                <a href="#philosophy" className="hover:text-white transition-colors">О нас</a>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>

                <ScrollReveal variant="fade-in" delay={0.4}>
                    <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans font-bold uppercase tracking-widest text-gray-500 relative z-10">
                        <span>© 2026 Mari Nails Premium Studio.</span>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a
                                href="https://www.instagram.com/mari_nails_5/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer hover:text-secret-pink transition-colors"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://t.me/marinaiillss"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer hover:text-secret-pink transition-colors"
                            >
                                Telegram
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </footer>

            <EditorialModal
                isOpen={isVisionOpen}
                onClose={() => setIsVisionOpen(false)}
                title="Vision 2026"
                text={<>Ваши руки — это инструмент, которым вы творите свою судьбу. Ухаживая за ними, вы проявляете уважение к своему будущему. Стиль начинается с кончиков пальцев, и мы здесь, чтобы убедиться, что ваше будущее в надежных и красивых руках.</>}
            />
        </>
    );
};

export default Footer;