import { NextResponse } from "next/server";
import { PUT } from "./route"; // Adjust path if necessary
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design"; // Mock this

jest.mock("@/lib/mongodb");
jest.mock("@/models/Design");

describe("PUT /api/design/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if design ID is missing", async () => {
    const request = {} as Request;
    const params = Promise.resolve({ id: "" }); // Empty ID

    const response = await PUT(request, { params });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Design ID is required" });
  });

  it("should return 400 if required fields are missing", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    const request = {
      json: jest.fn().mockResolvedValue({
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
        // Missing roomName
      }),
    } as unknown as Request;
    const params = Promise.resolve({ id: "123" });

    const response = await PUT(request, { params });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Missing required fields" });
  });

  it("should return 404 if design is not found", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (Design.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const request = {
      json: jest.fn().mockResolvedValue({
        roomName: "Master Bedroom",
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
      }),
    } as unknown as Request;
    const params = Promise.resolve({ id: "123" });

    const response = await PUT(request, { params });

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ message: "Design not found" });
    expect(Design.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        roomName: "Master Bedroom",
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
        furniture: undefined,
        sceneAmbientLight: undefined,
        sceneShadowIntensity: undefined,
        showShading: undefined,
        thumbnail: undefined,
      },
      { new: true }
    );
  });

  it("should return 200 on successful design update", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    const updatedDesign = { _id: "123", roomName: "Master Bedroom Updated" };
    (Design.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedDesign);

    const request = {
      json: jest.fn().mockResolvedValue({
        roomName: "Master Bedroom Updated",
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
        furniture: ["Bed", "Nightstand"],
        sceneAmbientLight: 0.5,
        sceneShadowIntensity: 0.8,
        showShading: true,
        thumbnail: "thumbnail-url",
      }),
    } as unknown as Request;
    const params = Promise.resolve({ id: "123" });

    const response = await PUT(request, { params });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "Design updated successfully" });
    expect(Design.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        roomName: "Master Bedroom Updated",
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
        furniture: ["Bed", "Nightstand"],
        sceneAmbientLight: 0.5,
        sceneShadowIntensity: 0.8,
        showShading: true,
        thumbnail: "thumbnail-url",
      },
      { new: true }
    );
  });

  it("should return 500 on server error", async () => {
    (dbConnect as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

    const request = {
      json: jest.fn().mockResolvedValue({
        roomName: "Master Bedroom",
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
      }),
    } as unknown as Request;
    const params = Promise.resolve({ id: "123" });

    const response = await PUT(request, { params });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Failed to update design",
      error: "Database connection failed",
    });
  });
});