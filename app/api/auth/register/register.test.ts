import { NextResponse } from "next/server";
import { POST } from "./route"; // Adjust path if necessary
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Mock this
import bcrypt from "bcryptjs"; // Mock this

jest.mock("@/lib/mongodb");
jest.mock("@/models/User");
jest.mock("bcryptjs");

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if user already exists", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (User.findOne as jest.Mock).mockResolvedValue({ email: "existing@example.com" });

    const request = {
      json: jest.fn().mockResolvedValue({ name: "Test User", email: "existing@example.com", password: "password123" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "User already exists" });
  });

  it("should return 201 on successful registration", async () => {
    (dbConnect as jest.Mock).mockResolvedValue(undefined);
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword123");
    const saveMock = jest.fn().mockResolvedValue(undefined);
    (User as jest.Mock).mockImplementation(() => ({ save: saveMock }));

    const request = {
      json: jest.fn().mockResolvedValue({ name: "Test User", email: "new@example.com", password: "password123" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ message: "User registered successfully" });
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(saveMock).toHaveBeenCalled();
  });

  it("should return 500 on server error", async () => {
    (dbConnect as jest.Mock).mockRejectedValue(new Error("Database connection failed"));

    const request = {
      json: jest.fn().mockResolvedValue({ name: "Test User", email: "new@example.com", password: "password123" }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Server error",
      error: "Database connection failed",
    });
  });
});