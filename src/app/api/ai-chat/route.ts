import { chatSession } from "@/config/AiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    try {
        // console.log("Received prompt:", prompt);

        const result = await chatSession.sendMessage(prompt);
const AiResponse = result.response.text();
        // console.log("result:", AiResponse);`

        return NextResponse.json({
            result: AiResponse
        });
    } catch (err: any) {
        console.error("Error processing request:", err);
        return NextResponse.json({
            error: err.message || "Internal Server Error"
        });
    }
}