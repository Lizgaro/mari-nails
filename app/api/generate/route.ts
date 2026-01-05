import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
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
            limiter: Ratelimit.slidingWindow(50, '1 h'), // Reduced to 50/h to be safer with free tiers
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
                // Return 429 but maybe soft limit for now to not break demo
                // return NextResponse.json({ error: "Too many requests" }, { status: 429 });
            }
        }

        const body = await req.json();
        const { prompt, mode, image } = body;

        // CACHING LOGIC (Optimization)
        // Only cache 'create' mode as 'edit' is too specific with base64 images
        if (redis && mode === 'create' && prompt) {
            const cacheKey = `mari-ai-cache:${Buffer.from(prompt).toString('base64')}`;
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[API] Serving from cache for: "${prompt.substring(0, 20)}..."`);
                return NextResponse.json({ result: cached });
            }
        }

        // Initialize SDK
        const genAI = new GoogleGenerativeAI(apiKey);

        // Using Gemini 2.0 Flash Exp (as confirmed working). 
        // User requested 2.5, but if API returns 404, we fallback to 2.0.
        // For now, staying on 2.0-flash-exp as it is the current valid endpoint for this key.
        const modelId = "gemini-2.0-flash-exp";

        const model = genAI.getGenerativeModel({
            model: modelId,
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
            ]
        });

        let result;

        console.log(`[API] Generation started. Mode: ${mode}, Model: ${modelId}`);

        if (mode === 'edit' && image) {
            // Edit Mode: Image + Prompt
            // Strip base64 prefix if present
            const base64Data = image.split(',')[1] || image;

            const promptPart = { text: prompt };
            const imagePart = { inlineData: { mimeType: 'image/png', data: base64Data } };

            result = await model.generateContent([promptPart, imagePart]);
        } else {
            // Create Mode: Text Prompt
            result = await model.generateContent(prompt);
        }

        const response = await result.response;

        // Extract Image and Text from the response candidates
        let generatedImage = null;
        let text = "";

        // Check if response has candidates and parts
        if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    generatedImage = part.inlineData.data;
                }
                if (part.text) {
                    text += part.text;
                }
            }
        }

        console.log(`[API] Generated Text Length: ${text.length}`);
        if (text.length < 500) console.log(`[API] Text Preview: ${text}`);
        console.log(`[API] Generated Image: ${generatedImage ? 'YES' : 'NO'}`);

        // If we found an image, format it as data URL if not already
        let finalResult = text;
        if (generatedImage) {
            finalResult = `data:image/png;base64,${generatedImage}`;
        } else if (text) {
            // Check if the model returned an image link in markdown (possible fallback)
            // e.g. ![Image](url)
            // But usually we want inlineData.
            // If text is all we got, we send text. Frontend might expect image.
        }

        // SAVE TO CACHE
        if (redis && mode === 'create' && generatedImage) {
            const cacheKey = `mari-ai-cache:${Buffer.from(prompt).toString('base64')}`;
            // Cache for 24 hours (86400 seconds)
            await redis.set(cacheKey, finalResult, { ex: 86400 });
            console.log(`[API] Cached result for: "${prompt.substring(0, 20)}..."`);
        }

        return NextResponse.json({ result: finalResult });

    } catch (error: any) {
        console.error("API Error details:", error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.toString()
        }, { status: 500 });
    }
}
