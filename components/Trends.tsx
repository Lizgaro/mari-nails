"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Scroll3D from './Scroll3D';
import Tilt3D from './Tilt3D';
import ScrollReveal from './ScrollReveal';
import BlurImage from './BlurImage';
import { ArrowRight, X, Sparkles, Quote, BookOpen, LayoutGrid, StretchHorizontal, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';

const trends = [
    {
        id: 1,
        title: "Кибер Хром",
        desc: "Жидкий металл и расплавленное серебро. Геометрия будущего.",
        fullArticle: "В 2026 году хром перестает быть просто покрытием — он становится текстурой. Мы используем специальные японские гели, имитирующие расплавленную ртуть. Этот стиль вдохновлен киберпанком и цифровым искусством. Форма ногтей становится более агрессивной: стилеты или четкий квадрат. Идеально отражает свет неоновых вывесок мегаполиса.",
        expertName: "Li Wei",
        expertRole: "Digital-художник",
        expertTip: "Сочетайте хром с матовым топом для создания контраста глубины.",
        imageUrl: "/trends/cyber-chrome.png",
        gallery: [
            "/trends/cyber-chrome.png",
            "/trends/digital-reptile.png"
        ],
        color: "text-gray-400"
    },
    {
        id: 2,
        title: "3D Био-Стекло",
        desc: "Эффект влажного стекла и биолюминесценция.",
        fullArticle: "Тренд, пришедший из Кореи и Японии, захватывает подиумы. Прозрачные объемные капли, создающие эффект линзы, под которыми скрыты сухоцветы или голографические элементы. Это не просто маникюр, это микро-аквариум на ваших руках. Используются био-гели, светящиеся в UV-лучах, создавая эффект живого организма.",
        expertName: "Anna K.",
        expertRole: "Редактор Beauty Vogue",
        expertTip: "Идеально смотрится на 'голой' базе. Требует идеального состояния кутикулы.",
        imageUrl: "/trends/3d-bio-glass.png",
        gallery: [
            "/trends/3d-bio-glass.png",
            "/trends/weightlessness.png"
        ],
        color: "text-blue-300"
    },
    {
        id: 3,
        title: "Премиум Арт",
        desc: "Сложная роспись и неоновые акценты.",
        fullArticle: "Возвращение к ручной росписи, но в новой интерпретации. Абстракция, глитч-эффекты и неоновые вспышки на черном фоне. Каждая работа — это уникальная картина. Мы используем аэрограф для создания плавных переходов, которые невозможно повторить кистью. Это искусство для тех, кто не боится внимания.",
        expertName: "Sarah M.",
        expertRole: "Топ-стилист Моделей",
        expertTip: "Не бойтесь асимметрии. Разный дизайн на левой и правой руке — главный шик сезона.",
        imageUrl: "/trends/premium-art.png",
        gallery: [
            "/trends/premium-art.png",
            "/trends/quantum-indigo.png"
        ],
        color: "text-secret-hot"
    },
    {
        id: 4,
        title: "Бархатная Аура",
        desc: "Магнитные бури и северное сияние на кончиках пальцев.",
        fullArticle: "Тренд, рожденный под влиянием солнечной активности 2025 года. Мы используем магнитные частицы нового поколения, которые создают эффект глубокого космоса. Под разным углом цвет меняется от изумрудного до фиолетового. Это не просто 'кошачий глаз', это 5D-объем, который гипнотизирует.",
        expertName: "Elena R.",
        expertRole: "Мастер-Колорист",
        expertTip: "Лучше всего раскрывается при вечернем освещении и на темной подложке.",
        imageUrl: "/trends/velvet-aura.png",
        gallery: [
            "/trends/velvet-aura.png",
            "/trends/quantum-indigo.png"
        ],
        color: "text-green-300"
    },
    {
        id: 5,
        title: "Нео-Трайбл",
        desc: "Агрессивная геометрия и эстетика тату 90-х.",
        fullArticle: "Цикличность моды возвращает нас к трайбл-узорам, но в минималистичном исполнении. Четкие черные линии на идеальном нюде или молочной базе. Это выбор смелых, дерзких натур. Линии повторяют анатомию пальцев, визуально удлиняя их и делая руку изящнее и опаснее.",
        expertName: "Max T.",
        expertRole: "Тату-мастер",
        expertTip: "Требует матового топа для эффекта 'рисунка на коже'.",
        imageUrl: "/trends/neo-tribal.png",
        gallery: [
            "/trends/neo-tribal.png",
            "/trends/neo-tribal-fashion.png"
        ],
        color: "text-white"
    },
    {
        id: 6,
        title: "Невесомость",
        desc: "Аэрогель и отрицательное пространство.",
        fullArticle: "Использование аэрогеля — материала, применяемого в NASA. Это позволяет создавать экстремальную длину, которая практически ничего не весит. Дизайн строится на принципе 'Negative Space' — прозрачные участки ногтя чередуются с плотным цветом, создавая ощущение левитирующих элементов.",
        expertName: "Dr. Polina",
        expertRole: "Нейл-Архитектор",
        expertTip: "Идеальный выбор для тех, кто хочет длину, но устал от тяжести геля.",
        imageUrl: "/trends/weightlessness.png",
        gallery: [
            "/trends/weightlessness.png",
            "/trends/3d-bio-glass.png"
        ],
        color: "text-purple-300"
    },
    {
        id: 7,
        title: "Балеткор",
        desc: "Шелковые ленты, жемчуг и нежность.",
        fullArticle: "Эстетика балерины воплощена в маникюре. Нежно-розовые оттенки, 3D-банты, имитация шелковых лент и микро-жемчуг. Этот стиль сочетает в себе невинность и строгую дисциплину высокой моды. Идеально подходит для формы 'миндаль' или 'пуанты'.",
        expertName: "Chloe B.",
        expertRole: "Стилист Недели Моды",
        expertTip: "Добавьте матовый финиш, чтобы имитировать текстуру пудры или ткани.",
        imageUrl: "/trends/balletcore.png",
        gallery: [
            "/trends/balletcore.png",
            "/trends/porcelain-skin.png"
        ],
        color: "text-pink-300"
    },
    {
        id: 8,
        title: "Жидкое Золото",
        desc: "Расплавленная роскошь и текстура золотых слитков.",
        fullArticle: "Чистое золото в его самом текучем состоянии. Дизайн имитирует капли расплавленного драгоценного металла, стекающие по ногтю. Используется настоящее сусальное золото 24К для создания неповторимой текстуры и блеска. Это манифест богатства и статуса.",
        expertName: "Gigi H.",
        expertRole: "Амбассадор Бренда",
        expertTip: "Идеально на прозрачной или нюдовой базе для эффекта 'золота на коже'.",
        imageUrl: "/trends/liquid-gold.png",
        gallery: [
            "/trends/liquid-gold.png",
            "/trends/nano-gold.png"
        ],
        color: "text-yellow-400"
    },
    {
        id: 9,
        title: "Фарфоровая Кожа",
        desc: "Идеальная белизна и хрупкость антикварной куклы.",
        fullArticle: "Тренд на экстремальную 'фарфоровую' бледность ногтей. Плотный белый или молочный цвет с глянцевым финишем, напоминающим глазурь. Иногда добавляется эффект 'кракелюра' — тончайшие трещинки, заполненные золотом, как в технике Кинцуги.",
        expertName: "Yoko O.",
        expertRole: "Художник-Керамист",
        expertTip: "Требует идеально увлажненной кутикулы, чтобы не нарушить эффект безупречности.",
        imageUrl: "/trends/porcelain-skin.png",
        gallery: [
            "/trends/porcelain-skin.png",
            "/trends/balletcore.png"
        ],
        color: "text-white"
    },
    {
        id: 10,
        title: "Цифровая Рептилия",
        desc: "Текстурированный хром и имитация кожи дракона.",
        fullArticle: "Слияние биологических текстур и цифрового блеска. Мы используем 3D-гель для создания чешуи, покрытой хромом-хамелеоном, который меняет цвет от зеленого до фиолетового. Этот агрессивный и одновременно притягательный дизайн символизирует адаптацию к цифровой эре.",
        expertName: "Iris V.",
        expertRole: "Футурист",
        expertTip: "Сочетайте с минималистичными серебряными украшениями для создания кибер-образа.",
        imageUrl: "/trends/digital-reptile.png",
        gallery: [
            "/trends/digital-reptile.png",
            "/trends/cyber-chrome.png"
        ],
        color: "text-emerald-400"
    },
    {
        id: 11,
        title: "Квантовый Индиго",
        desc: "Глубокий электрический синий с эффектом бездны.",
        fullArticle: "Цвет, поглощающий внимание. Насыщенный пигмент с внутренним свечением, напоминающий черенковское излучение. Этот оттенок индиго создает ощущение глубины и тайны, идеально подходя для тех, кто хочет заявить о себе без лишних слов.",
        expertName: "Dr. Alex",
        expertRole: "Исследователь Цвета",
        expertTip: "Идеально подходит для формы 'стилет' или 'балерина' для усиления драматического эффекта.",
        imageUrl: "/trends/quantum-indigo.png",
        gallery: [
            "/trends/quantum-indigo.png",
            "/trends/velvet-aura.png"
        ],
        color: "text-indigo-500"
    },
    {
        id: 12,
        title: "Нано-Золото",
        desc: "Микросхемы и золотые нити высоких технологий.",
        fullArticle: "Эстетика высоких технологий в ювелирном исполнении. Тончайшие золотые линии, напоминающие архитектуру микропроцессора, нанесенные на прозрачный или молочный фон. Это интеллектуальная роскошь для цифровой элиты.",
        expertName: "Sophia L.",
        expertRole: "Техно-Стилист",
        expertTip: "Требует глянцевого топа для создания эффекта стекла над микросхемой.",
        imageUrl: "/trends/nano-gold.png",
        gallery: [
            "/trends/nano-gold.png",
            "/trends/liquid-gold.png"
        ],
        color: "text-yellow-500"
    },
    {
        id: 13,
        title: "Нео-Кутюр",
        desc: "Слияние высокой моды и цифровой эстетики трайбл.",
        fullArticle: "Эксклюзивный дизайн, вдохновленный показами 2026 года. Сложные чернильные узоры, переходящие в объемные элементы. Это выбор для тех, кто рассматривает маникюр как часть подиумного образа. Мы объединяем классическую каллиграфию и 3D-печать гелем.",
        expertName: "Jean P.",
        expertRole: "Fashion Директор",
        expertTip: "Носите с массивными серебряными украшениями для максимального эффекта.",
        imageUrl: "/trends/neo-tribal-fashion.png",
        gallery: [
            "/trends/neo-tribal-fashion.png",
            "/trends/neo-tribal.png"
        ],
        color: "text-gray-200"
    }
];

const expertTips = [
    {
        id: 1,
        author: "Белла Хадид",
        role: "Супермодель",
        text: "В этом сезоне я выбираю только короткий квадрат и глубокий винный оттенок. Это новая классика."
    },
    {
        id: 2,
        author: "Пэт Макграт",
        role: "Визажист",
        text: "Маникюр должен быть продолжением макияжа. Хромированные ногти идеально дополняют сияющую кожу."
    },
    {
        id: 3,
        author: "Хейли Бибер",
        role: "Трендсеттер",
        text: "Глазированный эффект останется с нами, но теперь он становится цветным. Попробуйте лавандовую втирку."
    },
    {
        id: 4,
        author: "Том Бачик",
        role: "Звездный мастер",
        text: "Здоровье ногтей важнее дизайна. Японский уход перед покрытием — обязательный этап."
    },
    {
        id: 5,
        author: "Кайли Дженнер",
        role: "Икона Стиля",
        text: "Длинные стилеты возвращаются, но теперь они должны быть прозрачными, как стекло."
    }
];

const Trends: React.FC = () => {
    const [selectedTrend, setSelectedTrend] = useState<typeof trends[0] | null>(null);
    const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

    // Scrolling Refs and Logic for Trends
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Scrolling Refs and Logic for Tips
    const tipsContainerRef = useRef<HTMLDivElement>(null);
    const [tipsProgress, setTipsProgress] = useState(0);

    const handleScroll = (ref: React.RefObject<HTMLDivElement>, setProgress: (val: number) => void) => {
        if (!ref.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        const maxScroll = scrollWidth - clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setProgress(progress);
    };

    const scrollByAmount = (ref: React.RefObject<HTMLDivElement>, amount: number) => {
        if (!ref.current) return;
        ref.current.scrollBy({ left: amount, behavior: 'smooth' });
    };

    const handleNextTrend = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedTrend) return;
        const currentIndex = trends.findIndex(t => t.id === selectedTrend.id);
        const nextIndex = (currentIndex + 1) % trends.length;
        setSelectedTrend(trends[nextIndex]);
    };

    const handlePrevTrend = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedTrend) return;
        const currentIndex = trends.findIndex(t => t.id === selectedTrend.id);
        const prevIndex = (currentIndex - 1 + trends.length) % trends.length;
        setSelectedTrend(trends[prevIndex]);
    };

    return (
        // SOLID VOGUE BLACK BACKGROUND
        <section className="py-32 bg-[#050505] text-white overflow-hidden relative" id="trends">

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-white/20 pb-8">
                    <div>
                        <ScrollReveal variant="slide-up">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secret-hot mb-4 block">Коллекция 2026</span>
                        </ScrollReveal>
                        <ScrollReveal variant="slide-up" delay={0.1}>
                            <h2 className="font-serif text-6xl md:text-8xl leading-none font-medium tracking-tight">
                                Избранные <br /> <span className="italic text-gray-500 font-light">Тренды</span>
                            </h2>
                        </ScrollReveal>
                    </div>
                    <div className="mt-8 md:mt-0 flex flex-col items-end gap-6">
                        <ScrollReveal variant="slide-up" delay={0.2}>
                            <p className="font-sans text-sm text-gray-400 max-w-xs text-right leading-relaxed font-light">
                                Исследуйте архитектурные формы и текстуры, определяющие следующий сезон.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-in" delay={0.3}>
                            <div className="flex gap-4">
                                {/* Navigation Controls (Desktop) */}
                                {viewMode === 'slider' && (
                                    <div className="hidden md:flex gap-2">
                                        <button
                                            onClick={() => scrollByAmount(scrollContainerRef, -400)}
                                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            onClick={() => scrollByAmount(scrollContainerRef, 400)}
                                            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* View Toggle Button */}
                                <button
                                    onClick={() => setViewMode(prev => prev === 'slider' ? 'grid' : 'slider')}
                                    className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-white hover:text-secret-hot transition-colors border border-white/20 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10"
                                >
                                    {viewMode === 'slider' ? (
                                        <>
                                            <LayoutGrid size={14} /> Развернуть Все
                                        </>
                                    ) : (
                                        <>
                                            <StretchHorizontal size={14} /> Компактный Вид
                                        </>
                                    )}
                                </button>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* TRENDS CONTAINER */}
                <div className="relative">
                    {/* Gradient Masks for Slider - Subtle fade to black */}
                    {viewMode === 'slider' && (
                        <>
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none hidden md:block" style={{ opacity: scrollProgress > 1 ? 1 : 0, transition: 'opacity 0.3s' }}></div>
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none hidden md:block" style={{ opacity: scrollProgress < 99 ? 1 : 0, transition: 'opacity 0.3s' }}></div>
                        </>
                    )}

                    <div
                        ref={scrollContainerRef}
                        onScroll={() => handleScroll(scrollContainerRef, setScrollProgress)}
                        className={viewMode === 'slider'
                            ? "flex overflow-x-auto gap-6 md:gap-8 pb-12 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
                            : "grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 animate-fade-in"
                        }
                    >
                        {trends.map((trend, idx) => (
                            <div
                                key={trend.id}
                                className={viewMode === 'slider'
                                    ? "min-w-[85vw] md:min-w-[400px] group relative cursor-pointer snap-center"
                                    : "group relative cursor-pointer"
                                }
                                onClick={() => setSelectedTrend(trend)}
                            >
                                <Scroll3D delay={viewMode === 'slider' ? 0 : idx * 0.1} className="h-full">
                                    <Tilt3D className="relative aspect-[3/4] overflow-hidden transition-all duration-700 ease-out border border-white/10 rounded-sm bg-[#0a0a0a] shadow-2xl h-full">
                                        <BlurImage
                                            src={trend.imageUrl}
                                            alt={trend.title}
                                            className="w-full h-full"
                                            imageClassName="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                                        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-4 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <span className={`w-12 h-[1px] bg-current ${trend.color}`}></span>
                                                <span className={`font-sans text-[9px] font-bold uppercase tracking-widest ${trend.color}`}>Читать статью</span>
                                            </div>
                                            {/* Animate Title with fade-in-up when visible */}
                                            <h3 className="font-serif text-3xl italic mb-2 animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
                                                {trend.title}
                                            </h3>
                                            <p className="font-sans text-sm text-gray-300 opacity-90 leading-relaxed max-w-[90%] line-clamp-2 font-light">
                                                {trend.desc}
                                            </p>
                                            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                                <span className="font-sans text-[9px] uppercase tracking-widest text-gray-500">{trend.expertName}</span>
                                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </Tilt3D>
                                </Scroll3D>
                            </div>
                        ))}

                        {/* View All Card (Visible only in Slider Mode) */}
                        {viewMode === 'slider' && (
                            <div
                                className="min-w-[200px] flex items-center justify-center snap-center cursor-pointer group"
                                onClick={() => setViewMode('grid')}
                            >
                                <div className="text-center group-hover:text-secret-hot transition-colors">
                                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:border-secret-hot group-hover:bg-secret-hot/10 transition-all">
                                        <ArrowRight size={24} />
                                    </div>
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest block">Смотреть Все</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar for Slider Mode */}
                    {viewMode === 'slider' && (
                        <div className="hidden md:block w-full h-[1px] bg-white/10 mt-4 relative">
                            <div
                                className="absolute top-0 left-0 h-full bg-secret-hot transition-all duration-300"
                                style={{ width: `${Math.max(10, (100 / trends.length))}%`, left: `${scrollProgress * (1 - (1 / trends.length))}%` }}
                            ></div>
                        </div>
                    )}
                </div>

                {/* SCROLLABLE EXPERT TIPS SECTION - REDESIGNED */}
                <div className="border-t border-white/10 pt-20">
                    <div className="flex justify-between items-center mb-8">
                        <ScrollReveal variant="fade-in">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-secret-hot" />
                                <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white">
                                    Инсайды Индустрии
                                </h3>
                            </div>
                        </ScrollReveal>
                        {/* Navigation Controls for Tips (Desktop) */}
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={() => scrollByAmount(tipsContainerRef, -350)}
                                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-gray-400"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={() => scrollByAmount(tipsContainerRef, 350)}
                                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-gray-400"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                    <Scroll3D delay={0.2}>
                        <div className="relative">
                            {/* Gradient Masks for Tips */}
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none hidden md:block" style={{ opacity: tipsProgress > 1 ? 1 : 0, transition: 'opacity 0.3s' }}></div>
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none hidden md:block" style={{ opacity: tipsProgress < 99 ? 1 : 0, transition: 'opacity 0.3s' }}></div>

                            <div
                                ref={tipsContainerRef}
                                onScroll={() => handleScroll(tipsContainerRef, setTipsProgress)}
                                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide cursor-grab active:cursor-grabbing -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory"
                            >
                                {expertTips.map((tip) => (
                                    <div key={tip.id} className="min-w-[300px] md:min-w-[400px] p-8 bg-white/[0.03] border border-white/10 rounded-sm hover:border-secret-hot/30 hover:bg-white/[0.05] transition-all duration-300 relative group flex flex-col justify-between h-[250px] shadow-none hover:shadow-2xl snap-center">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secret-hot to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                        <div>
                                            <Quote size={32} className="text-white/5 absolute top-6 right-6 group-hover:text-secret-hot/20 transition-colors" />
                                            <p className="font-serif text-2xl italic leading-relaxed text-gray-200 mb-6 relative z-10 font-light">
                                                "{tip.text}"
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-auto">
                                            {/* Circular Avatar with Initial */}
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secret-hot/30 via-secret-pink/20 to-purple-500/20 flex items-center justify-center border border-white/10 shrink-0">
                                                <span className="font-serif italic text-white/90 text-sm font-medium">
                                                    {tip.author.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-secret-hot transition-colors">{tip.author}</p>
                                                <p className="font-sans text-[9px] text-gray-500 uppercase">{tip.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar for Tips */}
                            <div className="hidden md:block w-full h-[1px] bg-white/10 mt-0 relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-secret-hot transition-all duration-300"
                                    style={{ width: `${Math.max(10, (100 / expertTips.length))}%`, left: `${tipsProgress * (1 - (1 / expertTips.length))}%` }}
                                ></div>
                            </div>
                        </div>
                    </Scroll3D>
                </div>
            </div>

            {/* MODAL OVERLAY - Editorial Mode */}
            {selectedTrend && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/95 transition-all" onClick={() => setSelectedTrend(null)}></div>

                    <div className="bg-white text-black w-full max-w-6xl h-[90vh] md:h-[95vh] rounded-none md:rounded-3xl relative z-10 animate-slide-up shadow-2xl overflow-hidden flex flex-col md:flex-row selection:bg-secret-pink selection:text-white">

                        {/* Desktop Image Side (Left) */}
                        <div className="hidden md:block w-1/2 h-full relative group">
                            <Image
                                src={selectedTrend.imageUrl}
                                alt={selectedTrend.title}
                                fill
                                sizes="50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                            <div className="absolute bottom-12 left-12 text-white">
                                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-4">
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest">{selectedTrend.expertName} Выбор</span>
                                </div>
                            </div>

                            {/* PREV/NEXT BUTTONS ON IMAGE (Desktop) */}
                            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <button onClick={handlePrevTrend} className="pointer-events-auto w-12 h-12 bg-black/30 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md flex items-center justify-center transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={handleNextTrend} className="pointer-events-auto w-12 h-12 bg-black/30 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md flex items-center justify-center transition-all">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content Side (Right) - Scrollable with Tint */}
                        <div className="w-full md:w-1/2 h-full overflow-y-auto relative bg-[#faf9f6] flex flex-col">
                            {/* Mobile Image (Top) with Navigation */}
                            <div className="md:hidden w-full h-72 relative shrink-0">
                                <Image
                                    src={selectedTrend.imageUrl}
                                    alt={selectedTrend.title}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                                <button
                                    onClick={() => setSelectedTrend(null)}
                                    className="absolute top-4 left-4 z-20 p-2 bg-black/50 text-white rounded-full backdrop-blur-md"
                                >
                                    <X size={20} />
                                </button>

                                {/* Mobile Navigation Arrows overlaying image */}
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                                    <button onClick={handlePrevTrend} className="pointer-events-auto p-2 bg-black/30 text-white rounded-full backdrop-blur-sm">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={handleNextTrend} className="pointer-events-auto p-2 bg-black/30 text-white rounded-full backdrop-blur-sm">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Close Button Desktop */}
                            <button
                                onClick={() => setSelectedTrend(null)}
                                className="hidden md:flex absolute top-6 right-6 z-20 w-10 h-10 items-center justify-center bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 md:p-16 flex-grow">
                                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secret-hot mb-4 block flex items-center gap-2">
                                    <BookOpen size={12} /> Выбор Редакции
                                </span>

                                <h2 className="font-serif text-5xl md:text-6xl italic leading-[1] mb-10 text-vogue-black max-w-md font-medium">
                                    {selectedTrend.title}
                                </h2>

                                {/* Typography Enhanced for Reading - Editorial Standard */}
                                <div className="font-serif text-gray-800 mb-12 max-w-prose mx-auto">
                                    <p className="text-lg md:text-xl leading-loose tracking-wide first-letter:text-6xl md:first-letter:text-7xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-vogue-black text-left font-light">
                                        {selectedTrend.fullArticle}
                                    </p>
                                </div>

                                {/* RELATED TRENDS NAVIGATION */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <LayoutGrid size={12} className="text-gray-400" />
                                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                            Похожие Образы
                                        </span>
                                    </div>
                                    <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide -mx-8 px-8 pb-4 md:grid md:grid-cols-2 md:gap-4 md:m-0 md:p-0 md:overflow-visible">
                                        {trends.filter(t => t.id !== selectedTrend.id).slice(0, 2).map((trend, i) => (
                                            <div
                                                key={trend.id}
                                                className="min-w-[85%] md:min-w-0 shrink-0 snap-center relative group cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Add a small scroll to top of modal content or just switch
                                                    const modalContent = document.querySelector('.overflow-y-auto');
                                                    if (modalContent) modalContent.scrollTop = 0;
                                                    setSelectedTrend(trend);
                                                }}
                                            >
                                                <ScrollReveal
                                                    variant="slide-up"
                                                    delay={0.1 * i}
                                                    className="rounded-lg overflow-hidden h-48 md:h-48 relative border border-gray-100 w-full"
                                                >
                                                    <BlurImage
                                                        src={trend.imageUrl}
                                                        alt={trend.title}
                                                        className="w-full h-full"
                                                        imageClassName="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                        <p className="text-white font-serif italic text-lg">{trend.title}</p>
                                                        <p className="text-white/70 font-sans text-[9px] uppercase tracking-widest">Смотреть</p>
                                                    </div>
                                                </ScrollReveal>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl border border-gray-100 mb-8 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        {/* Dynamic Gradient Avatar with Initials */}
                                        {/* Dynamic Gradient Avatar with Initials */}
                                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-white border border-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                                            <span className="font-serif italic text-xl font-bold text-gray-900">
                                                {selectedTrend.expertName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Мнение Эксперта</p>
                                            <p className="font-serif text-2xl italic text-vogue-black mb-2 font-light">
                                                "{selectedTrend.expertTip}"
                                            </p>
                                            <p className="font-sans text-xs font-bold uppercase text-black">— {selectedTrend.expertName}, {selectedTrend.expertRole}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Bottom Action */}
                            <div className="sticky bottom-0 bg-[#faf9f6]/95 backdrop-blur-md p-6 border-t border-gray-100 mt-auto">
                                <button
                                    className="w-full py-4 bg-vogue-black text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-secret-hot transition-all duration-300 shadow-xl hover:shadow-secret-pink/20 rounded-xl"
                                    onClick={() => setSelectedTrend(null)}
                                >
                                    Записаться на этот образ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Trends;