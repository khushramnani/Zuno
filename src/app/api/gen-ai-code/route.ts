import { GenAICode } from "@/config/AiConfig"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
    try {
        const {prompt} = await req.json()
    
        const response = await GenAICode.sendMessage(prompt)
        const result = response.response.text()
        if (!result || result.trim() === "") {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(result);
    
        return NextResponse.json(parsed)
    } catch (error: any) {
        console.error("Error processing request:", error)
        return NextResponse.json({
            error: error.message || "Internal Server Error"
        })
        
    }
}