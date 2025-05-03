import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design";

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the request body
    const designData = await request.json();

    // Validate required fields
    if (
      !designData.roomName ||
      !designData.roomType ||
      !designData.roomDimensions ||
      !designData.wallColor
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new design document
    const design = new Design({
      roomName: designData.roomName,
      roomType: designData.roomType,
      roomDimensions: designData.roomDimensions,
      wallColor: designData.wallColor,
      furniture: designData.furniture,
      sceneAmbientLight: designData.sceneAmbientLight,
      sceneShadowIntensity: designData.sceneShadowIntensity,
      showShading: designData.showShading,
      thumbnail: designData.thumbnail, // Save the thumbnail
    });

    // Save the design to MongoDB
    await design.save();

    return NextResponse.json(
      { message: "Design saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to save design", error: (error as Error).message },
      { status: 500 }
    );
  }
}