import { NextResponse } from "next/server";
import { POST } from "./route"; // Adjust path if necessary
import dbConnect from "@/lib/mongodb";
import Design from "@/models/Design"; // Mock this

jest.mock("@/lib/mongodb");
jest.mock("@/models/Design");

describe("POST /api/design", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const request = {
      json: jest.fn().mockResolvedValue({
        roomType: "Bedroom",
        roomDimensions: "10x12",
        wallColor: "#FFFFFF",
        // Missing roomName
      }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Missing required fields" });
  });

  it("should return 201 on successful design creation", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    const saveMock = jest.fn().mockResolvedValue(undefined);
    (Design as jest.Mock).mockImplementation(() => ({ save: saveMock }));

    const designData = {
      roomName: "Master Bedroom",
      roomType: "Bedroom",
      roomDimensions: "10x12",
      wallColor: "#FFFFFF",
      furniture: ["Bed", "Nightstand"],
      sceneAmbientLight: 0.5,
      sceneShadowIntensity: 0.8,
      showShading: true,
      thumbnail: "thumbnail-url",
    };

    const request = {
      json: jest.fn().mockResolvedValue(designData),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ message: "Design saved successfully" });
    expect(Design).toHaveBeenCalledWith({
      roomName: "Master Bedroom",
      roomType: "Bedroom",
      roomDimensions: "10x12",
      wallColor: "#FFFFFF",
      furniture: ["Bed", "Nightstand"],
      sceneAmbientLight: 0.5,
      sceneShadowIntensity: 0.8,
      showShading: true,
      thumbnail: "thumbnail-url",
    });
    expect(saveMock).toHaveBeenCalled();
  });

  it("should return 500 on server error", async () => {
    (dbConnect as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

    const designData = {
      roomName: "Master Bedroom",
      roomType: "Bedroom",
      roomDimensions: "10x12",
      wallColor: "#FFFFFF",
    };

    const request = {
      json: jest.fn().mockResolvedValue(designData),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Failed to save design",
      error: "Database connection failed",
    });
  });
});