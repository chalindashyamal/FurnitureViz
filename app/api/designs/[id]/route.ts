import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Design ID is required" }, { status: 400 });
    }

    const design = await Design.findById(id).lean();

    if (!design) {
      return NextResponse.json({ message: "Design not found" }, { status: 404 });
    }

    const formattedDesign = {
      id: design._id.toString(),
      roomName: design.roomName,
      roomType: design.roomType,
      roomDimensions: design.roomDimensions,
      wallColor: design.wallColor,
      furniture: design.furniture,
      sceneAmbientLight: design.sceneAmbientLight,
      sceneShadowIntensity: design.sceneShadowIntensity,
      showShading: design.showShading,
      thumbnail: design.thumbnail, 
    };

    return NextResponse.json(formattedDesign, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch design", error: (error as Error).message },
      { status: 500 }
    );
  }
}