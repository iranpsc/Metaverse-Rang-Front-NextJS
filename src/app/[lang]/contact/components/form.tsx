"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    title: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS:", process.env.SMTP_PASS);
    console.log("NEXT_PUBLIC_EMAIL_TO:", process.env.NEXT_PUBLIC_EMAIL_TO);
    try {
      // nextjs request/response (api) handling
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: [process.env.NEXT_PUBLIC_EMAIL_TO],
          cc: [""],
          bcc: [],
          message: {
            subject: `Contact Form Submission from ${formData.name}`,
            text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phoneNo}\nMessage: ${formData.message}`,
            html: `
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phoneNo}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
              `,
          },
        }),
      });

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again later.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 gap-3 md:gap-5">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2"
              name="name"
              value={formData.name}
              id="name"
              placeholder="نام و نام خانوادگی"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="tel"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
              name="phoneNo"
              value={formData.phoneNo}
              id="phoneNo"
              placeholder="شماره تلفن"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
              name="email"
              value={formData.email}
              id="email"
              placeholder="پست الکترونیک"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
              name="title"
              value={formData.title}
              id="title"
              placeholder="موضوع پیام"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 w-full mt-2 md:mt-5">
        <div className="flex flex-col">
          <textarea
            className="w-full bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
            id="message"
            rows={5}
            placeholder="پیام خود را اینجا بنویسید..."
            onChange={handleChange}
            name="message"
            value={formData.message}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-[4px] bg-blueLink dark:bg-dark-yellow dark:text-black w-full text-white font-bold text-center p-4 rounded-[10px] active:scale-105"
        >
          ارسال پیام
        </button>
      </div>
    </form>
  );
}
