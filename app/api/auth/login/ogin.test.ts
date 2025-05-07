import { NextResponse } from "next/server";
import { POST } from "../login/route"; // Updated import path
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Mock this
import bcrypt from "bcryptjs"; // Mock this

jest.mock("@/lib/mongodb");
jest.mock("@/models/User");
jest.mock("bcryptjs");

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if user is not found", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const request = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Invalid email or password" });
  });

  it("should return 400 if password does not match", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (User.findOne as jest.Mock).mockResolvedValue({ email: "test@example.com", password: "$2b$10$...hashed...", name: "Test User" });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const request = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "wrongpassword" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "Invalid email or password" });
  });

  it("should return 200 with user data on successful login", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (User.findOne as jest.Mock).mockResolvedValue({ email: "test@example.com", password: "$2b$10$...hashed...", name: "Test User" });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const request = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: "Login successful",
      user: { name: "Test User", email: "test@example.com" },
    });
  });

  it("should return 500 on server error", async () => {
    (dbConnect as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

    const request = {
      json: jest.fn().mockResolvedValue({ email: "test@example.com", password: "password123" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Server error",
      error: "Database connection failed",
    });
  });
});