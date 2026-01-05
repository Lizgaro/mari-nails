"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
    Sparkles, Wand2, Download, RefreshCcw, Palette, Layers, Hexagon,
    Gem, Cpu, Heart, Droplets, Cloud, Star, Flame, Zap, PenTool, Wind, Scissors, ChevronDown, ChevronUp,
    Upload, Image as ImageIcon, X, Edit3, Camera, GitCompare
} from 'lucide-react';
import Tilt3D from './Tilt3D';
import ScrollReveal from './ScrollReveal';

const styles = [
    {
        id: 'chrome',
        name: 'Кибер Хром',
        icon: <Cpu size={16} />,
        prompt: 'Futuristic liquid silver chrome nails, velvet texture, melted metal 3D textures, sci-fi cyberpunk aesthetic, highly reflective mirror finish, long stiletto shape, neon lighting reflections, high fashion editorial'
    },
    {
        id: 'paired',
        name: 'Парные ногти',
        icon: <GitCompare size={16} />,
        prompt: 'High fashion mismatched manicure trend, duality concept, left hand vs right hand distinct designs. One hand solid deep monochrome, other hand intricate nail art or contrasting color. Cohesive complementary aesthetic, yin and yang vibe, editorial pose showing both hands, 8k resolution.'
    },
    {
        id: 'soap',
        name: 'Чистота (Soap)',
        icon: <Droplets size={16} />,
        prompt: 'Ultra-clean "soap" nails trend, pearlescent finish, translucent milky pink color, wet look finish, perfectly manicured skin, bubbly fresh aesthetic, short natural oval shape, spa atmosphere'
    },
    {
        id: 'coquette',
        name: 'Кокеткор',
        icon: <Heart size={16} />,
        prompt: 'Soft pink nails with delicate 3D ribbon bows, small pearls, lace patterns, dainty feminine aesthetic, almond shape, romantic balletcore style, soft romantic lighting'
    },
    {
        id: 'old_money',
        name: 'Тихая Роскошь',
        icon: <Gem size={16} />,
        prompt: 'High-end "Old Money" aesthetic manicure, sheer milky nude base, short soft square shape, ultra-glossy glass finish, clean cuticles, expensive minimalist look, subtle diamond ring on finger, luxury lifestyle photography'
    },
    {
        id: 'red',
        name: 'Роковой Красный',
        icon: <Flame size={16} />,
        prompt: 'Deep wine red color, sharp long stiletto nails, high gloss finish, Louboutin vibe, femme fatale elegance, high contrast editorial, dramatic lighting'
    },
    {
        id: 'aura',
        name: 'Аура Градиент',
        icon: <Cloud size={16} />,
        prompt: 'Airbrushed aura nails, blushing center gradient, mystical energy, hazy soft focus colors, lavender and mint blend, spiritual vibe, dreamy ethereal photography'
    },
    {
        id: 'y2k',
        name: 'Y2K 3D Арт',
        icon: <Star size={16} />,
        prompt: 'Korean style chunky 3D nail art, clear builder gel blobs, teddy bear charms, chains, pastel colors, maximalist Y2K aesthetic, playful and cute'
    },
    {
        id: 'bio',
        name: 'Био-Люминесценция',
        icon: <Zap size={16} />,
        prompt: 'Bioluminescent jelly nails, glowing deep sea creatures texture, transparent blue-green tint, organic 3D fluid shapes, wet glass effect, avatar movie aesthetic'
    },
    {
        id: 'french',
        name: 'Микро-Френч',
        icon: <PenTool size={16} />,
        prompt: 'Modern micro french manicure, barely there thin white tip, perfect nude base, short square shape, minimalist chic, wedding guest style, clean and precise'
    },
    {
        id: 'velvet',
        name: 'Бархатный Блик',
        icon: <Wind size={16} />,
        prompt: 'Magnetic cat eye polish, crushed velvet texture, silver shifting champagne light, dimensional shimmer, luxury fabric effect, soft glam'
    },
    {
        id: 'grunge',
        name: 'Гранж Металл',
        icon: <Scissors size={16} />,
        prompt: 'Distressed metallic nails, silver and rusted gold mix, industrial texture, nail charms, chain details, urban fashion vibe, street style photography'
    },
    {
        id: 'tortoise',
        name: 'Черепаховый Принт',
        icon: <Layers size={16} />,
        prompt: 'Tortoise shell pattern nail art, amber and dark brown translucent layers, jelly finish, gold foil flakes, autumn luxury, square shape, warm cozy lighting'
    }
];

const editStyles = [
    { id: 'retro', name: 'Ретро Фильтр', icon: <Camera size={14} />, prompt: 'Apply a vintage retro film filter with grain and warm color grading' },
    { id: 'matte', name: 'Матовый Топ', icon: <Wind size={14} />, prompt: 'Change the nail finish to a luxurious matte velvet texture' },
    { id: 'glitter', name: 'Блестки', icon: <Star size={14} />, prompt: 'Add shimmering silver glitter overlay to the nails' },
    { id: 'neon', name: 'Неоновый Свет', icon: <Zap size={14} />, prompt: 'Add futuristic neon glowing lighting effects' },
    { id: 'clean', name: 'Студийный Фон', icon: <Scissors size={14} />, prompt: 'Replace the background with a clean, minimal studio backdrop' },
];

const AIGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeStyle, setActiveStyle] = useState<string | null>(null);
    const [showAllStyles, setShowAllStyles] = useState(false);

    // Edit Mode State
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const displayedStyles = showAllStyles ? styles : styles.slice(0, 6);

    const handleStyleSelect = (styleId: string, stylePrompt: string) => {
        setActiveStyle(styleId);
        setPrompt(stylePrompt);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSourceImage(reader.result as string);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = () => {
        setSourceImage(null);
        setGeneratedImage(null);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);

        try {
            let body: any = { mode };

            if (mode === 'edit') {
                if (!sourceImage) {
                    setError('Пожалуйста, загрузите изображение для редактирования.');
                    setLoading(false);
                    return;
                }
                if (!prompt) {
                    setError('Пожалуйста, опишите, как вы хотите изменить изображение.');
                    setLoading(false);
                    return;
                }

                // Pass full base64 string, server will handle stripping prefix if needed
                body = {
                    mode: 'edit',
                    image: sourceImage, // This contains "data:image/..."
                    prompt: prompt
                };

            } else {
                // Create Mode - Enhanced "Vogue Quality" Prompt Wrapper
                const currentPrompt = prompt || (activeStyle ? styles.find(s => s.id === activeStyle)?.prompt : '');

                if (!currentPrompt) {
                    setLoading(false);
                    return;
                }

                // VOGUE-QUALITY PROMPT ENGINEERING
                const fullPrompt = `Ultra-realistic macro fashion photography of a woman's hand. 
        Focus: Luxury high-end manicure. 
        Style description: ${currentPrompt}. 
        Details: Hyper-detailed skin texture, pores visible, soft natural lighting, cinematic depth of field, 8k resolution, sharp focus on nails, Vogue magazine aesthetic, professional hand model pose, jewelry details. 
        Negative prompt: deformed fingers, extra fingers, ugly hands, blur, low quality, cartoon, illustration.`;

                body = {
                    mode: 'create',
                    prompt: fullPrompt
                };
            }

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при генерации');
            }

            if (data.image) {
                // Verify if it has prefix or not
                const imgData = data.image.startsWith('data:') ? data.image : `data:image/png;base64,${data.image}`;
                setGeneratedImage(imgData);
            } else {
                // If no image but we have text, it's likely a refusal or safety filter
                console.log(`[API] Failure: No image generated. Model response: ${data.result}`);
                throw new Error(data.result || "Не удалось сгенерировать изображение. Попробуйте другой запрос.");
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'ИИ занят созданием красоты. Пожалуйста, попробуйте еще раз или уточните запрос.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 px-6 bg-white/60 backdrop-blur-xl border-t border-black/5 relative overflow-hidden" id="ai-atelier">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-secret-pink/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 relative z-10">
                    <ScrollReveal variant="fade-in">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Wand2 className="text-secret-hot animate-pulse-slow" size={20} />
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secret-hot inline-block transform -rotate-3">Цифровое Ателье</span>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="slide-up" delay={0.1}>
                        <h2 className="font-serif text-5xl md:text-7xl text-vogue-black leading-tight font-medium tracking-tight">
                            Mari Vision Lab <br /> <span className="italic text-gray-500 font-light">2026</span>
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="slide-up" delay={0.2}>
                        <p className="mt-6 font-sans text-xs text-gray-600 max-w-lg mx-auto leading-relaxed font-light">
                            Создайте уникальный дизайн или отредактируйте свое фото.
                            Нейросеть визуализирует ваши самые смелые идеи за секунды.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Controls Section */}
                    <div className="md:col-span-7 order-2 md:order-1">
                        <ScrollReveal variant="slide-up" delay={0.3}>
                            <div className="bg-white/80 p-8 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-white/50 backdrop-blur-md">

                                {/* Mode Toggle */}
                                <div className="flex p-1 bg-gray-100/50 rounded-xl mb-8">
                                    <button
                                        onClick={() => { setMode('create'); setError(null); }}
                                        className={`flex-1 py-3 text-[10px] font-sans font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2
                        ${mode === 'create' ? 'bg-white text-secret-hot shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Sparkles size={14} /> Создать
                                    </button>
                                    <button
                                        onClick={() => { setMode('edit'); setError(null); }}
                                        className={`flex-1 py-3 text-[10px] font-sans font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2
                        ${mode === 'edit' ? 'bg-white text-secret-hot shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Edit3 size={14} /> Редактировать
                                    </button>
                                </div>

                                {mode === 'create' ? (
                                    /* CREATE MODE UI */
                                    <div className="mb-8 animate-fade-in">
                                        <div className="flex justify-between items-end mb-4">
                                            <label className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                                <Palette size={12} /> {showAllStyles ? 'Полная Коллекция' : 'Стили • Избранное'}
                                            </label>
                                        </div>

                                        <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-3 md:m-0 md:p-0 md:overflow-visible md:pb-0">
                                            {displayedStyles.map(style => (
                                                <button
                                                    key={style.id}
                                                    onClick={() => handleStyleSelect(style.id, style.prompt)}
                                                    className={`
                                        min-w-[48%] shrink-0 snap-center md:min-w-0 md:shrink relative p-4 rounded-xl border text-left transition-all duration-300 group overflow-hidden h-full flex flex-col gap-3
                                        ${activeStyle === style.id
                                                            ? 'border-secret-hot bg-secret-hot/5 shadow-md'
                                                            : 'border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white'
                                                        }
                                    `}
                                                >
                                                    <div className={`
                                        absolute top-0 left-0 w-1 h-full bg-secret-hot transition-transform duration-300
                                        ${activeStyle === style.id ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50'}
                                    `}></div>

                                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                                        ${activeStyle === style.id ? 'bg-secret-hot text-white' : 'bg-white text-gray-400 group-hover:text-secret-hot shadow-sm'}
                                    `}>
                                                        {style.icon}
                                                    </div>

                                                    <span className={`font-serif italic text-sm leading-tight block ${activeStyle === style.id ? 'text-secret-hot' : 'text-gray-600'}`}>
                                                        {style.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setShowAllStyles(!showAllStyles)}
                                            className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-[9px] font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-secret-hot transition-colors border border-dashed border-gray-200 rounded-lg hover:border-secret-hot/30"
                                        >
                                            {showAllStyles ? (
                                                <>Скрыть <ChevronUp size={12} /></>
                                            ) : (
                                                <>Показать Все ({styles.length}) <ChevronDown size={12} /></>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    /* EDIT MODE UI */
                                    <div className="mb-8 animate-fade-in">
                                        <label className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-400">
                                            <ImageIcon size={12} /> Исходное изображение
                                        </label>

                                        {!sourceImage ? (
                                            <div
                                                onClick={triggerFileUpload}
                                                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-secret-hot/50 hover:bg-secret-hot/5 transition-all group"
                                            >
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-secret-hot transition-colors text-gray-400">
                                                    <Upload size={20} />
                                                </div>
                                                <p className="font-serif italic text-gray-500 mb-2">Нажмите, чтобы загрузить фото</p>
                                                <p className="font-sans text-[9px] text-gray-400 uppercase tracking-wider">JPG, PNG до 5MB</p>
                                            </div>
                                        ) : (
                                            <div className="relative rounded-xl overflow-hidden border border-gray-200 h-48">
                                                <Image
                                                    src={sourceImage}
                                                    alt="Source"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                                <button
                                                    onClick={handleRemoveImage}
                                                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />

                                        {/* Quick Styles for Edit Mode */}
                                        <div className="mt-6">
                                            <label className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest mb-3 text-gray-400">
                                                <Sparkles size={12} /> Быстрые Стили
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {editStyles.map(style => (
                                                    <button
                                                        key={style.id}
                                                        onClick={() => setPrompt(style.prompt)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full hover:border-secret-hot hover:text-secret-hot hover:bg-secret-hot/5 transition-all group shadow-sm active:scale-95"
                                                    >
                                                        <span className="text-gray-400 group-hover:text-secret-hot transition-colors">{style.icon}</span>
                                                        <span className="font-serif italic text-xs text-gray-600 group-hover:text-secret-hot">{style.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Text Input */}
                                <div className="relative group">
                                    <label className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-400">
                                        <Layers size={12} /> {mode === 'create' ? 'Ваши Пожелания (Опционально)' : 'Что изменить?'}
                                    </label>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => {
                                            setPrompt(e.target.value);
                                        }}
                                        placeholder={mode === 'create'
                                            ? "Например: добавь золотые кольца, сделай ногти длиннее..."
                                            : "Например: добавь ретро фильтр, убери человека с фона..."}
                                        className="w-full h-24 p-4 rounded-xl border border-gray-200 bg-white font-serif text-lg text-vogue-black focus:outline-none focus:border-secret-hot focus:ring-1 focus:ring-secret-hot transition-all resize-none placeholder:text-gray-300"
                                    />
                                    <div className="absolute bottom-4 right-4">
                                        <Hexagon size={16} className="text-gray-200" />
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                    <span className="text-[9px] font-sans text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                        Gemini 2.5 Flash
                                    </span>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || (mode === 'create' && !prompt && !activeStyle) || (mode === 'edit' && (!sourceImage || !prompt))}
                                        className="bg-vogue-black text-white px-10 py-4 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secret-hot hover:shadow-lg hover:shadow-secret-pink/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transform hover:-translate-y-1"
                                    >
                                        {loading ? (
                                            <>
                                                <RefreshCcw className="animate-spin" size={14} />
                                                Обработка...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={14} />
                                                {mode === 'create' ? 'Сгенерировать' : 'Изменить'}
                                            </>
                                        )}
                                    </button>
                                </div>

                                {error && (
                                    <p className="mt-4 text-center text-red-500 font-sans text-xs bg-red-50 p-2 rounded">{error}</p>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Preview Section */}
                    <div className="md:col-span-5 order-1 md:order-2 flex justify-center items-center">
                        <ScrollReveal variant="slide-up" delay={0.4} className="w-full">
                            <Tilt3D className="relative w-full aspect-square" intensity={15}>
                                <div className="w-full h-full bg-white rounded-3xl p-3 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                                    <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden relative border border-black/5 flex items-center justify-center">
                                        {generatedImage ? (
                                            <>
                                                <Image
                                                    src={generatedImage}
                                                    alt="AI Design"
                                                    fill
                                                    className="object-cover animate-fade-in"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                                    <a
                                                        href={generatedImage}
                                                        download="mari-nails-design.png"
                                                        className="bg-white text-black px-6 py-3 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-secret-hot hover:text-white transition-colors flex items-center gap-2"
                                                    >
                                                        <Download size={14} /> Сохранить
                                                    </a>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-6">
                                                {loading ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="relative w-20 h-20">
                                                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                                            <div className="absolute inset-0 border-4 border-secret-hot border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                        <p className="font-serif italic text-gray-400 mt-6 animate-pulse">
                                                            {mode === 'edit' ? 'Редактируем фото...' : 'Мечтаем о дизайне...'}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="opacity-30 flex flex-col items-center">
                                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                                                            <Sparkles size={32} />
                                                        </div>
                                                        <p className="font-serif italic text-lg">Холст Пуст</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Watermark */}
                                        <div className="absolute top-6 left-6 z-10 opacity-60 mix-blend-overlay text-white">
                                            <span className="font-sans text-[8px] font-bold uppercase tracking-[0.2em] border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">Mari AI Studio</span>
                                        </div>
                                    </div>
                                </div>
                            </Tilt3D>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AIGenerator;