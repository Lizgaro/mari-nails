import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-vogue-black p-4 text-center">
            <ShieldAlert size={64} className="text-gray-300 mb-6" />
            <h2 className="font-serif text-4xl mb-4">404 - Страница не найдена</h2>
            <p className="font-sans text-gray-500 mb-8 max-w-md">
                Возможно, этот стиль вышел из моды или страницы никогда не существовало.
            </p>
            <Link href="/" className="bg-vogue-black text-white px-8 py-3 rounded-full font-sans uppercase tracking-widest text-xs hover:bg-secret-hot transition-colors">
                Вернуться на главную
            </Link>
        </div>
    );
}
