import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to MongoDB
    await dbConnect();

    const { id } = params;

    // Validate the ID
    if (!id) {
      return NextResponse.json({ message: "Design ID is required" }, { status: 400 });
    }

    // Delete the design from the database
    const result = await Design.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ message: "Design not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Design deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete design", error: (error as Error).message },
      { status: 500 }
    );
  }
}