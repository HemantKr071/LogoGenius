
import { AI_DESIGN_IDEA } from "@/config/AI-Model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    try {
        const result = await AI_DESIGN_IDEA.sendMessage(prompt);
        
        let LogoIdeasText = result.response.text();
        console.log("Raw Response:", LogoIdeasText);

        // Remove unwanted Markdown formatting (e.g., ```json ... ```)
        LogoIdeasText = LogoIdeasText.replace(/^```json|```$/g, "").trim();

     
        let LogoIdeas;
        try {
            LogoIdeas = JSON.parse(LogoIdeasText);
        } catch (jsonError) {
            console.warn("Response is not valid JSON, returning as text.");
            LogoIdeas = { response: LogoIdeasText };
        }

        return NextResponse.json(LogoIdeas);
    } catch (err) {
        console.error("Error generating ideas:", err);

        return NextResponse.json(
            { error: "Failed to generate ideas" },
            { status: 500 }
        );
    }
}
