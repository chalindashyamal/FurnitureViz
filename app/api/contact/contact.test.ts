import { NextResponse } from "next/server";
import { POST } from "./route"; // Adjust path if necessary
import nodemailer from "nodemailer"; // Mock this

jest.mock("nodemailer");

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const request = {
      json: jest.fn().mockResolvedValue({ firstName: "John", lastName: "Doe", email: "john@example.com", subject: "Hello" }), // Missing message
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ message: "All fields are required" });
  });

  it("should return 200 on successful email send", async () => {
    const sendMailMock = jest.fn().mockResolvedValue(undefined);
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    const request = {
      json: jest.fn().mockResolvedValue({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        subject: "Hello",
        message: "This is a test message",
      }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "Message sent successfully" });
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "john@example.com",
        to: "managementsystem56@gmail.com",
        subject: "New Contact Form Submission: Hello",
        text: expect.stringMatching(/Name: John Doe\s*Email: john@example\.com\s*Subject: Hello\s*Message: This is a test message/),
        html: expect.stringMatching(/<h2>New Contact Form Submission<\/h2>\s*<p><strong>Name:<\/strong> John Doe<\/p>\s*<p><strong>Email:<\/strong> john@example\.com<\/p>\s*<p><strong>Subject:<\/strong> Hello<\/p>\s*<p><strong>Message:<\/strong> This is a test message<\/p>/),
      })
    );
  });

  it("should return 500 if email sending fails", async () => {
    const sendMailMock = jest.fn().mockRejectedValue(new Error("SMTP error"));
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    const request = {
      json: jest.fn().mockResolvedValue({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        subject: "Hello",
        message: "This is a test message",
      }),
    } as unknown as Request;

    const response = await POST(request);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: "Failed to send email",
      error: "SMTP error",
    });
  });
});