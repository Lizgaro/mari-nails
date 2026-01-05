import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Redis for rate limiting and caching
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });

        ratelimit = new Ratelimit({
            redis: redis,
            limiter: Ratelimit.slidingWindow(50, '1 h'),
        });
    }
} catch (e) {
    console.warn("Redis init failed:", e);
}

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key not configured" }, { status: 500 });
        }

        // Rate limit
        if (ratelimit) {
            const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
            const { success } = await ratelimit.limit(ip);
            if (!success) {
                console.warn("Rate limit exceeded for IP:", ip);
            }
        }

        const body = await req.json();
        const { prompt, mode, image } = body;

        // Initialize NEW SDK
        const ai = new GoogleGenAI({ apiKey: apiKey });

        // User requested STRICTLY this model
        const modelId = "gemini-2.5-flash-image";

        console.log(`[API] Generation started with NEW SDK. Mode: ${mode}, Model: ${modelId}`);

        let response;

        if (mode === 'edit' && image) {
            // Edit Mode
            const base64Data = image.split(',')[1] || image;
            // Extract mime type if present in data URI, default to png
            let mimeType = 'image/png';
            if (image.includes('data:')) {
                mimeType = image.substring(image.indexOf(':') + 1, image.indexOf(';'));
            }

            response = await ai.models.generateContent({
                model: modelId,
                contents: [
                    {
                        parts: [
                            { inlineData: { mimeType, data: base64Data } },
                            { text: prompt }
                        ]
                    }
                ]
            });
        } else {
            // Create Mode
            response = await ai.models.generateContent({
                model: modelId,
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ],
            });
        }

        // Parse response from New SDK
        let generatedImage = null;
        let textResult = "";

        // The structure of response in new SDK might differ slightly, but usually:
        // response.candidates[0].content.parts...
        if (response && response.candidates && response.candidates.length > 0) {
            const parts = response.candidates[0].content.parts;
            if (parts) {
                for (const part of parts) {
                    if (part.inlineData) {
                        generatedImage = part.inlineData.data;
                    }
                    if (part.text) {
                        textResult += part.text;
                    }
                }
            }
        }

        console.log(`[API] Generated Image: ${generatedImage ? 'YES' : 'NO'}`);

        if (generatedImage) {
            const finalImage = `data:image/png;base64,${generatedImage}`;
            return NextResponse.json({ image: finalImage });
        } else {
            // Fallback: If no image, return error or text
            console.log(`[API] Failure: No image. Text: ${textResult}`);
            return NextResponse.json({ error: textResult || "Не удалось сгенерировать изображение." }, { status: 422 });
        }

    } catch (error: any) {
        console.error("API Error details:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.toString()
        }, { status: 500 });
    }
}
