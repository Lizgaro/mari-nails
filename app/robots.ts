import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://mari-nails-2026.vercel.app/sitemap.xml', // Replace with your actual domain
    };
}
