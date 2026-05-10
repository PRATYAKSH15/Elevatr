import { NextRequest, NextResponse } from "next/server";
import nodemailer, { Transporter } from "nodemailer";

// Configure Nodemailer transporter with full types
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface ContactForm {
  name: string;
  email: string;
  message: string;
  hp?: string; // honeypot
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactForm = await req.json();

    // Honeypot spam check
    if (body.hp && body.hp.trim() !== "") {
      return NextResponse.json({ success: true }); // silently ignore bots
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const escape = (str: string) =>
      str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Message:</strong><br/>${escape(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
