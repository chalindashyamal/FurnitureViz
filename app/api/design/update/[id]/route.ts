import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Unwrap params
    const { id } = await params;

    // Validate the ID
    if (!id) {
      return NextResponse.json({ message: "Design ID is required" }, { status: 400 });
    }

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

    // Update the design in MongoDB
    const updatedDesign = await Design.findByIdAndUpdate(
      id,
      {
        roomName: designData.roomName,
        roomType: designData.roomType,
        roomDimensions: designData.roomDimensions,
        wallColor: designData.wallColor,
        furniture: designData.furniture,
        sceneAmbientLight: designData.sceneAmbientLight,
        sceneShadowIntensity: designData.sceneShadowIntensity,
        showShading: designData.showShading,
        thumbnail: designData.thumbnail,
      },
      { new: true } // Return the updated document
    );

    if (!updatedDesign) {
      return NextResponse.json({ message: "Design not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Design updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update design", error: (error as Error).message },
      { status: 500 }
    );
  }
}