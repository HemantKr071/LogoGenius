import { AI_GENERATE_LOGO } from "@/config/AI-Model";
import OpenAI from "openai";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/FireBaseConfig";

export async function POST(req: NextRequest) {
    const { prompt, title, desc, email, userCredits } = await req.json();

    // Validate required fields
    if (!prompt || !title || !desc || !email) {
        return NextResponse.json(
            { error: "Missing required fields: title, desc, email, or userCredits" },
            { status: 400 }
        );
    }

    try {
        // Generate a text-based AI prompt
        const result = await AI_GENERATE_LOGO.sendMessage(prompt);
        let AIGenerateLogoPrompt =  result.response.text();

        // Remove Markdown code block delimiters if present
        AIGenerateLogoPrompt = AIGenerateLogoPrompt.replace(/```(?:json)?\n?([\s\S]*?)\n?```/g, "$1").trim();

        console.log("Cleaned Response:", AIGenerateLogoPrompt);

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(AIGenerateLogoPrompt);
        } catch (jsonError) {
            console.warn("Response is not valid JSON, returning as text.");
            parsedResponse = { text: AIGenerateLogoPrompt };
        }

        let AIPrompt = parsedResponse.prompt;

        const client = new OpenAI({
            baseURL: "https://api.studio.nebius.com/v1/",
            apiKey: process.env.NEBIUS_API_KEY,
        });

        const response = await client.images.generate({
            model: "black-forest-labs/flux-schnell",
            response_format: "url",
            prompt: AIPrompt,
            ...({
                extra_body: {
                    response_extension: "webp",
                    width: 1024,
                    height: 1024,
                    num_inference_steps: 4,
                    negative_prompt: "",
                    seed: -1,
                },
            } as any),
        });

        console.log("Logo Generated", response);
        const imageUrl = response.data[0].url;

        // Save image to Firebase
        try {
            const userDocRef = doc(db, "users", email);

            // Retrieve user data
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const currentCredits = userDocSnap.data()?.credits ?? 0;

                if (currentCredits > 0) {
                    await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
                        image: imageUrl,
                        title: title,
                        desc: desc,
                    });

                    // Update user credits
                    await updateDoc(userDocRef, {
                        credits: currentCredits - 1,
                    });

                    console.log("Logo saved & credits updated in Firebase");
                } else {
                    console.warn("User has insufficient credits.");
                    return NextResponse.json({ error: "Insufficient credits" }, { status: 400 });
                }
            } else {
                console.warn("User not found in Firebase.");
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
        } catch (err) {
            console.error("Error saving to Firebase:", err);
        }

        return NextResponse.json({ image: imageUrl });
    } catch (err) {
        console.error("Error generating logo:", err);
        return NextResponse.json({ error: "Failed to generate logo" }, { status: 500 });
    }
}
