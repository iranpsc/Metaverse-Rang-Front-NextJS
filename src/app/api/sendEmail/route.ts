import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS:", process.env.SMTP_PASS);
  try {
    const { to, cc, bcc, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Use true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to.join(', '),
      cc: cc.join(', '),
      bcc: bcc.join(', '),
      subject: message.subject,
      text: message.text,
      html: message.html,
    });

    return NextResponse.json({ message: 'با موفقیت ارسال شد', info }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'لطفا دوباره تلاش کنید', error: error.message },
      { status: 500 }
    );
  }
}
