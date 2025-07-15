import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.X_AI_API_KEY
    if (!apiKey) {
      console.error("X_AI_API_KEY not found in environment variables")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("Sending image generation request to X.AI API...")

    // Initialize OpenAI client with proper configuration for server-side usage
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.x.ai/v1",
      // Ensure we're running server-side
      dangerouslyAllowBrowser: false,
    })

    const response = await openai.images.generate({
      model: "grok-2-image",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    })

    console.log("X.AI API Response received successfully")

    if (!response.data || !response.data[0] || !response.data[0].url) {
      console.error("Invalid response structure:", response)
      return NextResponse.json({ error: "Failed to generate image - invalid response" }, { status: 500 })
    }

    return NextResponse.json({
      imageUrl: response.data[0].url,
      success: true,
    })
  } catch (error: any) {
    console.error("Image generation error details:", {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
    })

    // Handle specific OpenAI API errors
    if (error.status === 401) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    if (error.status === 429) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    if (error.status === 400) {
      return NextResponse.json({ error: "Invalid request. Please check your prompt." }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: error.message || "Failed to generate image",
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: error.status || 500 },
    )
  }
}

// Ensure this runs only on the server
export const runtime = "nodejs"
