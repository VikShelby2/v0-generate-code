import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Implement actual clone listing logic
    // - Fetch clones from database for authenticated user
    // - Include pagination
    // - Filter by status if needed

    const clones = [
      {
        id: "1",
        name: "Tech Influencer Style",
        platforms: ["x", "threads"],
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2025-01-15"),
        status: "ready",
      },
      {
        id: "2",
        name: "Fitness Coach Tone",
        platforms: ["instagram", "tiktok"],
        createdAt: new Date("2025-01-10"),
        updatedAt: new Date("2025-01-14"),
        status: "ready",
      },
    ]

    return NextResponse.json({ clones }, { status: 200 })
  } catch (error) {
    console.error("Error listing clones:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
