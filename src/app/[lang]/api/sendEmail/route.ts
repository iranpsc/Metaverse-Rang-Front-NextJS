import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/* =========================
   Utils
========================= */

// جلوگیری از XSS
const escapeHTML = (str: string) =>
  str.replace(/[&<>"']/g, (char) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char]!)
  );

// اعتبارسنجی ایمیل
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* =========================
   API
========================= */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, startTime } = body;

    /* =========================
       🛡️ فاز ۲ — Anti Spam
    ========================= */

    // 1️⃣ Honeypot
    if (formData?.website) {
      return NextResponse.json(
        { message: "Spam detected 🛑" },
        { status: 200 } // عمداً 200
      );
    }

    // 2️⃣ Timing check (حداقل 3 ثانیه)
    if (!startTime || Date.now() - startTime < 3000) {
      return NextResponse.json(
        { message: "ارسال خیلی سریع انجام شد" },
        { status: 429 }
      );
    }

    // 3️⃣ IP (برای فاز ۳)
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    console.log("CONTACT FORM IP:", ip);

    /* =========================
       1️⃣ Validation پایه
    ========================= */

    if (!formData) {
      return NextResponse.json(
        { message: "داده‌ای دریافت نشد" },
        { status: 400 }
      );
    }

    let { name, email, phoneNo, title, message } = formData;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "نام، ایمیل و پیام الزامی هستند" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "فرمت ایمیل نامعتبر است" },
        { status: 400 }
      );
    }

    /* =========================
       2️⃣ محدودیت طول ورودی
    ========================= */

    if (name.length > 100 || title?.length > 150) {
      return NextResponse.json(
        { message: "طول نام یا عنوان بیش از حد مجاز است" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { message: "طول پیام نباید بیشتر از ۲۰۰۰ کاراکتر باشد" },
        { status: 400 }
      );
    }

    /* =========================
       3️⃣ Sanitize
    ========================= */

    name = escapeHTML(name);
    email = escapeHTML(email);
    phoneNo = escapeHTML(phoneNo || "-");
    title = escapeHTML(title || "No title");
    message = escapeHTML(message);

    /* =========================
       4️⃣ SMTP
    ========================= */

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log("SMTP READY ✅");

    /* =========================
       5️⃣ Send Email
    ========================= */

    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${title}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phoneNo}
IP: ${ip}

Message:
${message}
      `,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNo}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "پیام با موفقیت ارسال شد ✅", info },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("CONTACT API ERROR ❌", error);
    return NextResponse.json(
      { message: "خطا در ارسال پیام", error: error.message },
      { status: 500 }
    );
  }
}
