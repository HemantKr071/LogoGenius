import { AI_GENERATE_LOGO } from "@/config/AI-Model";
import axios from "axios";
import { Firestore, setDoc, doc as firestoreDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/FireBaseConfig";

export async function POST(req: NextRequest) {
    const { prompt, title, desc, email } = await req.json();

    try {
        // Generate a text-based AI prompt
        const result = await AI_GENERATE_LOGO.sendMessage(prompt);
        let AIGenerateLogoPrompt = await result.response.text(); 

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

        // Send the prompt to ClipDrop API for logo generation
        const form = new FormData();
        form.append("prompt", AIPrompt);

        const imageResponse = await fetch("https://clipdrop-api.co/text-to-image/v1", {
            method: "POST",
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY!, // Replace with your API key
            },
            body: form,
        });

        if (!imageResponse.ok) {
            throw new Error(`ClipDrop API error: ${imageResponse.status} - ${imageResponse.statusText}`);
        }

        // Convert response to base64
        const buffer = await imageResponse.arrayBuffer();
        const base64image = Buffer.from(buffer).toString("base64");
        const base64imageWithMime = `data:image/png;base64,${base64image}`;
        
        //console.log("Generated Image:", base64imageWithMime);

        // Save image to Firebase
        try {
            await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
                image: base64imageWithMime,
                title: title,
                desc: desc,
            });
        } catch (err) {
            console.error("Error saving to Firebase:", err);
        }

        return NextResponse.json({ image: base64imageWithMime });

    } catch (err) {
        console.error("Error generating logo:", err);
        return NextResponse.json({ error: "Failed to generate logo" }, { status: 500 });
    }
}

// Helper function for Firestore document reference
function doc(db: Firestore, collection: string, email: string, subCollection: string, docId: string) {
    return firestoreDoc(db, collection, email, subCollection, docId);
}
