import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { to, cc, bcc, message } = await req.json();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // ❗ حتما false
  auth: {
    user: "8fd1c10e1bed58",
    pass: "46b18920655987",
  },
  tls: {
    rejectUnauthorized: false,
  },
});


    const mailOptions: any = {
      from: process.env.SMTP_USER,
      to: to.join(", "),
      subject: message.subject,
      text: message.text,
      html: message.html,
    };
console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
});

    if (cc?.length) mailOptions.cc = cc.join(", ");
    if (bcc?.length) mailOptions.bcc = bcc.join(", ");

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "با موفقیت ارسال شد ✅", info },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "خطا در ارسال ایمیل ❌", error: error.message },
      { status: 500 }
    );
  }
}
