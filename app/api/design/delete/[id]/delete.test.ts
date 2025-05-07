import { NextResponse } from "next/server";
import { DELETE } from "./route"; // Adjust path if necessary
import dbConnect from "@/lib/mongodb";

// ... rest of the code remains the same ...

describe("DELETE /api/design/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if design ID is missing", async () => {
    const request = {} as Request;
    const params = { id: "" }; // Empty ID

    try {
      const response = await DELETE(request, { params });
      logger.info("DELETE /api/design/[id] - 400 Bad Request");
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ message: "Design ID is required" });
    } catch (error) {
      logger.error("DELETE /api/design/[id] - Error:", error);
    }
  });

  it("should return 404 if design is not found", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (Design.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const request = {} as Request;
    const params = { id: "123" };

    try {
      const response = await DELETE(request, { params });
      logger.info("DELETE /api/design/[id] - 404 Not Found");
      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ message: "Design not found" });
      expect(Design.findByIdAndDelete).toHaveBeenCalledWith("123");
    } catch (error) {
      logger.error("DELETE /api/design/[id] - Error:", error);
    }
  });

  it("should return 200 on successful deletion", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (Design.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: "123" });

    const request = {} as Request;
    const params = { id: "123" };

    try {
      const response = await DELETE(request, { params });
      logger.info("DELETE /api/design/[id] - 200 OK");
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ message: "Design deleted successfully" });
      expect(Design.findByIdAndDelete).toHaveBeenCalledWith("123");
    } catch (error) {
      logger.error("DELETE /api/design/[id] - Error:", error);
    }
  });

  it("should return 500 on server error", async () => {
    (dbConnect as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

    const request = {} as Request;
    const params = { id: "123" };

    try {
      const response = await DELETE(request, { params });
      logger.info("DELETE /api/design/[id] - 500 Internal Server Error");
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({
        message: "Failed to delete design",
        error: "Database connection failed",
      });
    } catch (error) {
      logger.error("DELETE /api/design/[id] - Error:", error);
    }
  });
}); Mock this

jest.mock("@/lib/mongodb");
jest.mock("@/models/Design");

describe("DELETE /api/design/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if design ID is missing", async () => {
    const request = {} as Request;
    const params = { id: "" }; // Empty ID

    const response = await DELETE(request, { params });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Design ID is required" });
  });

  it("should return 404 if design is not found", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (Design.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const request = {} as Request;
    const params = { id: "123" };

    const response = await DELETE(request, { params });

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ message: "Design not found" });
    expect(Design.findByIdAndDelete).toHaveBeenCalledWith("123");
  });

  it("should return 200 on successful deletion", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (Design.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: "123" });

    const request = {} as Request;
    const params = { id: "123" };

    const response = await DELETE(request, { params });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "Design deleted successfully" });
    expect(Design.findByIdAndDelete).toHaveBeenCalledWith("123");
  });

  it("should return 500 on server error", async () => {
    (dbConnect as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

    const request = {} as Request;
    const params = { id: "123" };

    const response = await DELETE(request, { params });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Failed to delete design",
      error: "Database connection failed",
    });
  });
});