import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { firstName, lastName, email, subject, message } = await request.json();

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    // Create a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "managementsystem56@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error: (error as Error).message },
      { status: 500 }
    );
  }
}