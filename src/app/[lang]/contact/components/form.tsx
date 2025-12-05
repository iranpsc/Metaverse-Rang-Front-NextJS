"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactForm({ params }: any) {
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
    // console.log("SMTP_HOST:", process.env.SMTP_HOST);
    // console.log("SMTP_PORT:", process.env.SMTP_PORT);
    // console.log("SMTP_USER:", process.env.SMTP_USER);
    // console.log("SMTP_PASS:", process.env.SMTP_PASS);
    // console.log("NEXT_PUBLIC_EMAIL_TO:", process.env.NEXT_PUBLIC_EMAIL_TO);
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
            text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phoneNo}\nTitle: ${formData.title}\nMessage: ${formData.message}`,
            html: `
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phoneNo}</p>
                <p><strong>Title:</strong> ${formData.title}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
              `,
          },
        }),
      });

      const result = await response.json();
      toast.success(result.message);
      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        title: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again later.");
    }
  };
  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 gap-3 md:gap-5">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder ring-1 ring-transparent focus:ring-1 outline-0 focus:ring-light-primary dark:focus:ring-dark-primary outline-none  border-none"
              name="name"
              value={formData.name}
              id="name"
              placeholder={
                params.lang.toLowerCase() == "fa"
                  ? "نام و نام خانوادگی"
                  : "Name and Family"
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="tel"
              className={`w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder ring-1 ring-transparent focus:ring-1 outline-0 focus:ring-light-primary dark:focus:ring-dark-primary outline-none  border-none`}
              name="phoneNo"
              value={formData.phoneNo}
              id="phoneNo"
              placeholder={
                params.lang.toLowerCase() == "fa"
                  ? "شماره تلفن"
                  : "Phone number"
              }
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder ring-1 ring-transparent focus:ring-1 outline-0 focus:ring-light-primary dark:focus:ring-dark-primary outline-none  border-none"
              name="email"
              value={formData.email}
              id="email"
              placeholder={
                params.lang.toLowerCase() == "fa" ? "پست الکترونیک" : "E-mail"
              }
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder ring-1 ring-transparent focus:ring-1 outline-0 focus:ring-light-primary dark:focus:ring-dark-primary outline-none  border-none"
              name="title"
              value={formData.title}
              id="title"
              placeholder={
                params.lang.toLowerCase() == "fa"
                  ? "موضوع پیام"
                  : "Message title"
              }
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 w-full mt-2 md:mt-5">
        <div className="flex flex-col">
          <textarea
            className="w-full text-base mt-1 md:mt-0 rtl:text-right ltr:text-left bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder ring-1 ring-transparent focus:ring-1 outline-0 focus:ring-light-primary dark:focus:ring-dark-primary outline-none  border-none"
            id="message"
            rows={7}
            placeholder={
              params.lang.toLowerCase() == "fa"
                ? "پیام خود را اینجا بنویسید..."
                : "Please type your message here..."
            }
            onChange={handleChange}
            name="message"
            value={formData.message}
          ></textarea>
        </div>

        <button
  type="submit"
  disabled={!isFormValid}
  className={`mt-[4px] text-[19px] w-full md:w-[48%] font-bold py-2 rounded-[10px] active:scale-105 transition 
    ${isFormValid 
      ? "dark:bg-dark-yellow dark:text-black bg-light-primary text-white cursor-pointer" 
      : "bg-[#ECECEC] text-[#656565] cursor-not-allowed border border-gray-300"
    }`}
>
  {params.lang.toLowerCase() == "fa" ? "ارسال پیام" : "Send"}
</button>

      </div>
    </form>
  );
}
