import React from 'react';
import type { Metadata } from "next";
import { Playfair_Display, Lato, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mari Nails 2026 | Трендовый Маникюр и Премиум Сервис Москва",
  description: "Официальный сайт студии Mari Nails. Тренды маникюра 2026: Cyber Chrome, 3D Art, японский уход. Премиум сервис в Москве. Безопасность Medical Grade.",
  keywords: "маникюр 2026, тренды ногтей, cyber chrome, 3d дизайн, смарт педикюр, mari nails, салон красоты москва, дизайн ногтей 2026",
  openGraph: {
    type: "website",
    url: "https://marinails.com/",
    title: "Mari Nails 2026 | Трендовый Маникюр и Дизайн",
    description: "Тренды 2026: Металлик, 3D, Эко-глянец. Запишитесь онлайн на идеальный маникюр.",
    images: ["https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200&auto=format&fit=crop"],
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mari Nails 2026 | Трендовый Маникюр и Дизайн",
    description: "Тренды 2026: Металлик, 3D, Эко-глянец. Запишитесь онлайн на идеальный маникюр.",
    images: ["https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} ${pinyon.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}