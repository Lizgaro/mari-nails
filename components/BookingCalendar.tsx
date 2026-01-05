"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { BookingStep, Service, BookingFormData } from '../types';
import { SERVICES, TIME_SLOTS } from '../constants';

const BookingCalendar: React.FC = () => {
  const [step, setStep] = useState<BookingStep>(BookingStep.SELECT_SERVICE);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({ name: '', phone: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parallaxRef1 = useRef<HTMLDivElement>(null);
  const parallaxRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef1.current || !parallaxRef2.current) return;
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const componentOffset = parallaxRef1.current.parentElement?.offsetTop || 0;
      
      const relativeScroll = scrolled - componentOffset + windowHeight / 2;
      
      const y1 = relativeScroll * 0.15;
      const y2 = relativeScroll * -0.12;
      const r1 = relativeScroll * 0.05;

      parallaxRef1.current.style.transform = `translate3d(0, ${y1}px, 0) rotate(${r1}deg)`;
      parallaxRef2.current.style.transform = `translate3d(0, ${y2}px, 0) rotate(-${r1}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = daysInMonth(year, month);
  let startDay = firstDayOfMonth(year, month) - 1;
  if (startDay === -1) startDay = 6;

  const monthNames = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    if (newDate < new Date(new Date().setHours(0,0,0,0))) return;
    setSelectedDate(newDate);
    setTimeout(() => setStep(BookingStep.SELECT_TIME), 200);
  };

  const submitBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(BookingStep.CONFIRMATION);
    }, 1500);
  };

  const StepTitle: React.FC<{ children: React.ReactNode, number: string, subtitle?: string }> = ({ children, number, subtitle }) => (
    <div className="flex flex-col items-center mb-8 md:mb-12 relative z-10">
      <div className="flex items-center gap-3 mb-2">
         <span className="w-8 h-[1px] bg-secret-hot/50"></span>
         <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-secret-hot">ШАГ {number}</span>
         <span className="w-8 h-[1px] bg-secret-hot/50"></span>
      </div>
      <h3 className="font-serif text-3xl md:text-5xl text-vogue-black uppercase tracking-tight text-center relative leading-tight font-medium">
        {children}
        <span className="hidden md:block absolute -top-6 -right-8 font-script text-4xl text-vogue-gold/30 transform rotate-12 pointer-events-none select-none opacity-50">
             Детали
        </span>
      </h3>
      {subtitle && <p className="mt-3 font-sans text-[10px] md:text-xs text-gray-400 tracking-wide uppercase text-center max-w-[200px] md:max-w-none mx-auto">{subtitle}</p>}
    </div>
  );

  const resetBooking = () => {
      setStep(BookingStep.SELECT_SERVICE);
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({ name: '', phone: '', comment: '' });
  };

  return (
    <div className="w-full relative max-w-4xl mx-auto px-2 md:px-0">
      
      {/* Progress Indicators */}
      <div className="flex justify-center mb-6 md:mb-8 gap-2">
        {[0, 1, 2, 3].map((s) => (
            <div 
                key={s} 
                className={`h-1 rounded-full transition-all duration-500 ${
                    step >= s ? 'w-8 bg-secret-hot' : 'w-2 bg-gray-200'
                }`}
            />
        ))}
      </div>

      <div className="bg-white/60 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] border border-white/60 p-4 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden min-h-[550px] md:min-h-[600px] transition-all duration-500">
         
         {/* Background Decor */}
         <div ref={parallaxRef1} className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-secret-pink/20 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform"></div>
         <div ref={parallaxRef2} className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-vogue-gold/10 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform"></div>

        {/* STEP 1: SERVICE */}
        {step === BookingStep.SELECT_SERVICE && (
            <div className="animate-slide-up">
            <StepTitle number="01">Выбор Ритуала</StepTitle>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
                {SERVICES.map((service, idx) => (
                <button
                    key={service.id}
                    onClick={() => { setSelectedService(service); setStep(BookingStep.SELECT_DATE); }}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className="group relative w-full p-6 md:p-7 text-left bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(219,39,119,0.15)] hover:border-secret-pink/30 transition-all duration-300 transform active:scale-[0.99] overflow-hidden animate-slide-up opacity-0"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-secret-hot to-secret-pink transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 hidden md:block">
                        <ArrowRight className="text-secret-hot" size={24} strokeWidth={1.5} />
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 relative z-10 pl-2">
                        <div>
                            <h4 className="font-serif text-xl md:text-2xl text-vogue-black mb-2 group-hover:text-secret-hot transition-colors font-medium tracking-tight">
                                {service.title}
                            </h4>
                            <p className="font-sans text-[10px] md:text-xs text-gray-500 uppercase tracking-wide flex flex-wrap items-center gap-2 leading-relaxed">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-secret-hot transition-colors"></span>
                                {service.duration}
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-secret-hot transition-colors"></span> 
                                {service.description}
                            </p>
                        </div>
                        {/* Prices Removed as requested */}
                    </div>
                </button>
                ))}
            </div>
            </div>
        )}

        {/* STEP 2: DATE */}
        {step === BookingStep.SELECT_DATE && (
            <div className="animate-slide-up max-w-lg mx-auto">
            <button 
                onClick={() => setStep(BookingStep.SELECT_SERVICE)} 
                className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8 text-gray-400 hover:text-black transition-colors py-2"
            >
                <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Назад к услугам
            </button>
            
            <StepTitle number="02">Дата Визита</StepTitle>
            
            <div className="bg-white/80 p-4 md:p-8 rounded-3xl shadow-[0_15px_40px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex justify-between items-center mb-6 md:mb-8 px-1">
                    <button onClick={handlePrevMonth} className="p-3 md:p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-90"><ChevronLeft size={20} /></button>
                    <span className="font-serif text-lg md:text-xl italic font-bold text-vogue-black">{monthNames[month]} <span className="text-gray-300 not-italic font-sans text-base md:text-lg">{year}</span></span>
                    <button onClick={handleNextMonth} className="p-3 md:p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-90"><ChevronRight size={20} /></button>
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-[9px] md:text-[10px] font-bold tracking-widest text-gray-300 mb-4 md:mb-6">
                    {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-y-3 gap-x-1 md:gap-y-4 md:gap-x-2">
                {Array.from({ length: startDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(year, month, day);
                    const isPast = date < new Date(new Date().setHours(0,0,0,0));
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const isToday = new Date().toDateString() === date.toDateString();
                    
                    return (
                    <button
                        key={day}
                        disabled={isPast}
                        onClick={() => handleDateClick(day)}
                        className={`
                        h-11 w-11 md:h-12 md:w-12 mx-auto flex items-center justify-center font-serif text-lg md:text-xl transition-all duration-300 rounded-full relative group
                        ${isSelected ? 'bg-vogue-black text-white shadow-xl scale-110' : 'hover:bg-secret-pink/5 hover:text-secret-hot active:scale-95'}
                        ${isPast ? 'text-gray-200 cursor-not-allowed' : 'text-vogue-black'}
                        `}
                    >
                        {day}
                        {isToday && !isSelected && <span className="absolute -bottom-1 w-1 h-1 bg-secret-hot rounded-full"></span>}
                        {!isPast && !isSelected && <span className="absolute inset-0 border border-transparent group-hover:border-secret-pink/20 rounded-full transition-colors scale-110"></span>}
                    </button>
                    );
                })}
                </div>
            </div>
            </div>
        )}

        {/* STEP 3: TIME */}
        {step === BookingStep.SELECT_TIME && (
            <div className="animate-slide-up max-w-lg mx-auto">
             <button 
                onClick={() => setStep(BookingStep.SELECT_DATE)} 
                className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8 text-gray-400 hover:text-black transition-colors py-2"
            >
                <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Назад к дате
            </button>
            <StepTitle number="03">Точное Время</StepTitle>
            <p className="text-center font-serif text-2xl md:text-3xl italic mb-10 md:mb-12 text-black border-b border-black/5 pb-4 mx-auto w-fit">
                {selectedDate?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                {TIME_SLOTS.map((time, i) => (
                <button
                    key={time}
                    onClick={() => { setSelectedTime(time); setStep(BookingStep.CONTACT_DETAILS); }}
                    style={{ animationDelay: `${i * 0.05}s` }}
                    className="animate-slide-up opacity-0 group relative py-4 px-2 bg-white border border-gray-100 rounded-xl font-sans text-sm tracking-widest hover:border-black hover:bg-black hover:text-white active:bg-black active:text-white transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl active:scale-95"
                >
                    <span className="relative z-10">{time}</span>
                    <div className="absolute inset-0 bg-secret-hot/0 group-hover:bg-secret-hot/0 transition-colors"></div>
                </button>
                ))}
            </div>
            </div>
        )}

        {/* STEP 4: DETAILS */}
        {step === BookingStep.CONTACT_DETAILS && (
            <div className="animate-slide-up max-w-lg mx-auto">
             <button 
                onClick={() => setStep(BookingStep.SELECT_TIME)} 
                className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest mb-6 md:mb-8 text-gray-400 hover:text-black transition-colors py-2"
            >
                <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                Изменить время
            </button>
            <StepTitle number="04">Ваши Контакты</StepTitle>
            
            <div className="space-y-8">
                <div className="bg-white/60 p-6 rounded-2xl border border-gray-100 flex items-start gap-5 mb-10 shadow-sm">
                    <div className="min-w-[4px] h-12 bg-secret-hot rounded-full"></div>
                    <div>
                         <p className="font-serif text-lg md:text-xl italic text-vogue-black">{selectedService?.title}</p>
                         <p className="font-sans text-[10px] md:text-xs mt-2 text-gray-500 uppercase tracking-wider">
                            {selectedDate?.toLocaleDateString('ru-RU')} • {selectedTime}
                         </p>
                    </div>
                </div>

                <div className="group relative">
                <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer w-full border-b border-gray-300 py-3 font-serif text-xl bg-transparent focus:outline-none focus:border-secret-hot transition-all placeholder-transparent rounded-none"
                    placeholder="Имя"
                />
                <label 
                    htmlFor="name"
                    className="absolute left-0 -top-4 font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-secret-hot"
                >
                    Имя
                </label>
                </div>

                <div className="group relative">
                <input
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="peer w-full border-b border-gray-300 py-3 font-serif text-xl bg-transparent focus:outline-none focus:border-secret-hot transition-all placeholder-transparent rounded-none"
                    placeholder="Телефон"
                />
                <label 
                    htmlFor="phone"
                    className="absolute left-0 -top-4 font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-secret-hot"
                >
                    Телефон
                </label>
                </div>

                <div className="group relative">
                 <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    className="peer w-full border-b border-gray-300 py-3 font-serif text-xl bg-transparent focus:outline-none focus:border-secret-hot transition-all resize-none placeholder-transparent h-24 rounded-none"
                    placeholder="Комментарий"
                />
                 <label 
                    htmlFor="comment"
                    className="absolute left-0 -top-4 font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-secret-hot"
                >
                    Пожелания (Опционально)
                </label>
                </div>

                <button
                onClick={submitBooking}
                disabled={!formData.name || !formData.phone || isSubmitting}
                className="w-full mt-10 bg-vogue-black text-white py-5 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-secret-hot transition-all duration-500 shadow-xl hover:shadow-secret-pink/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group active:scale-[0.98]"
                >
                    <span className={`relative z-10 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                        Подтвердить
                    </span>
                    {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </button>
            </div>
            </div>
        )}

        {/* STEP 5: CONFIRMATION */}
        {step === BookingStep.CONFIRMATION && (
            <div className="text-center py-8 md:py-16 animate-fade-in relative max-w-lg mx-auto">
                <Sparkles className="absolute top-0 left-10 text-secret-hot/50 animate-bounce opacity-50" size={24} />
                <Sparkles className="absolute bottom-10 right-10 text-secret-pink/50 animate-bounce delay-75 opacity-50" size={32} />

            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-green-50/50 backdrop-blur-sm rounded-full mb-8 md:mb-10 animate-pulse-slow">
                <div className="p-5 bg-green-100/80 rounded-full">
                    <Check className="text-green-600" size={32} strokeWidth={2} />
                </div>
            </div>
            
            <h3 className="font-serif text-4xl md:text-6xl text-vogue-black mb-6 leading-tight font-medium">
                Спасибо, <br/> <span className="italic text-secret-hot">{formData.name || 'Гость'}</span>
            </h3>
            
            <div className="bg-white/90 p-8 rounded-2xl shadow-lg border border-gray-100 mb-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Детали Визита</p>
                <div className="font-serif text-2xl italic text-vogue-black">
                    {selectedDate?.toLocaleDateString('ru-RU')} в {selectedTime}
                </div>
                <div className="w-8 h-[1px] bg-black/10 mx-auto my-5"></div>
                <p className="font-sans text-xs text-gray-500">
                    Подтверждение отправлено на ваш телефон.<br/>
                    Мы ждем вас в Mari Nails Studio.
                </p>
            </div>

            <button
                onClick={resetBooking}
                className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-black hover:text-secret-hot transition-colors border-b border-black hover:border-secret-hot pb-1"
            >
                Забронировать еще один ритуал
            </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;