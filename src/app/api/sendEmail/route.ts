import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();

    if (!formData) {
      throw new Error("No formData received");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,          // حتماً وجود داشته باشه
      to: process.env.EMAIL_TO,              // مقصد فقط سرور
      subject: `Contact Form: ${formData.title}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phoneNo}

Message:
${formData.message}
      `,
      html: `
        <h2>New Contact Form</h2>
        <p><b>Name:</b> ${formData.name}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Phone:</b> ${formData.phoneNo}</p>
        <p><b>Title:</b> ${formData.title}</p>
        <p><b>Message:</b><br/>${formData.message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "با موفقیت ارسال شد ✅", info },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("SEND EMAIL ERROR ❌", error);
    return NextResponse.json(
      { message: "خطا در ارسال ایمیل ❌", error: error.message },
      { status: 500 }
    );
  }
}
