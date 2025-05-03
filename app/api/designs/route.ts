import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch all designs from the database
    const designs = await Design.find().sort({ createdAt: -1 }).lean();

    // Map the designs to the format expected by the frontend
    const formattedDesigns = designs.map((design) => ({
      id: design._id.toString(),
      name: design.roomName,
      date: new Date(design.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      thumbnail: design.thumbnail || "/placeholder.svg?height=100&width=200", // Use the stored thumbnail or fallback to placeholder
      type: design.roomType
        .split("_")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" "), // Convert "LIVING_ROOM" to "Living Room"
    }));

    return NextResponse.json(formattedDesigns, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch designs", error: (error as Error).message },
      { status: 500 }
    );
  }
}