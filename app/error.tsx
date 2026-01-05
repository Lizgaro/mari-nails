'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <h2 className="font-serif text-3xl mb-4">Что-то пошло не так!</h2>
            <p className="font-sans text-gray-500 mb-8 text-sm max-w-md">
                Мы уже работаем над исправлением этой ошибки. Попробуйте обновить страницу.
            </p>
            <button
                onClick={reset}
                className="flex items-center gap-2 bg-vogue-black text-white px-8 py-3 rounded-full font-sans uppercase tracking-widest text-xs hover:bg-secret-hot transition-colors"
            >
                <RefreshCcw size={14} />
                Попробовать снова
            </button>
        </div>
    );
}
