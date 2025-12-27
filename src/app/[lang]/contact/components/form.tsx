"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type Errors = {
  name?: string;
  email?: string;
  phoneNo?: string;
  title?: string;
  message?: string;
};

type Props = {
  lang: string;
};


export default function ContactForm({ lang }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    title: "",
    message: "",
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<Errors>({});
  const [startTime] = useState(Date.now());

  /* =========================
     Helpers
  ========================= */

  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim())
      newErrors.name = "نام الزامی است";

    if (!formData.email.trim())
      newErrors.email = "ایمیل الزامی است";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "فرمت ایمیل نادرست است";

    if (!formData.phoneNo.trim())
      newErrors.phoneNo = "شماره تماس الزامی است";
    else if (!/^[0-9]+$/.test(formData.phoneNo))
      newErrors.phoneNo = "شماره تماس فقط باید عدد باشد";

    if (!formData.title.trim())
      newErrors.title = "عنوان پیام الزامی است";

    if (!formData.message.trim())
      newErrors.message = "متن پیام الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     Handlers
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // پاک شدن ارور همان فیلد
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true); // 🔒 قفل دکمه

    try {
      const response = await fetch(`/${lang}/api/sendEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          startTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "ارسال ناموفق");
        return;
      }

      toast.success(result.message);

      setFormData({
        name: "",
        email: "",
        phoneNo: "",
        title: "",
        message: "",
        website: "",
      });
      setErrors({});
    } catch {
      toast.error("خطا در ارسال فرم ❌");
    } finally {
      setIsSubmitting(false); // 🔓 آزاد شدن دکمه
    }
  };


  /* =========================
     Render
  ========================= */

  return (
    <form onSubmit={handleSubmit}>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid lg:grid-cols-2 gap-3 md:gap-5">

        {/* name */}
        <div>
          <input
            className={`w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 
  dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder 
  ring-1 outline-0 focus:ring-1 outline-none border-none
  ${errors.name
                ? "ring-red-600 focus:ring-red-600"
                : "ring-transparent focus:ring-light-primary dark:focus:ring-dark-primary"
              }`}
            name="name"
            value={formData.name}
            placeholder={lang === "fa" ? "نام و نام خانوادگی" : "Name"}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* phone */}
        <div>
          <input
            className={`w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 
  dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder 
  ring-1 outline-0 focus:ring-1 outline-none border-none
  ${errors.name
                ? "ring-red-600 focus:ring-red-600"
                : "ring-transparent focus:ring-light-primary dark:focus:ring-dark-primary"
              }`}

            name="phoneNo"
            value={formData.phoneNo}
            placeholder={lang === "fa" ? "شماره تلفن" : "Phone"}
            onChange={handleChange}
          />
          {errors.phoneNo && (
            <p className="text-red-600 text-sm mt-1">{errors.phoneNo}</p>
          )}
        </div>

        {/* email */}
        <div>
          <input
            className={`w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 
  dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder 
  ring-1 outline-0 focus:ring-1 outline-none border-none
  ${errors.name
                ? "ring-red-600 focus:ring-red-600"
                : "ring-transparent focus:ring-light-primary dark:focus:ring-dark-primary"
              }`}
            name="email"
            value={formData.email}
           placeholder={
                lang.toLowerCase() == "fa" ? "پست الکترونیک" : "E-mail"
              }
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* title */}
        <div>
          <input
            className={`w-full text-base rtl:text-right ltr:text-left h-[50px] bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 
  dark:text-white dark-placeholder placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder 
  ring-1 outline-0 focus:ring-1 outline-none border-none
  ${errors.name
                ? "ring-red-600 focus:ring-red-600"
                : "ring-transparent focus:ring-light-primary dark:focus:ring-dark-primary"
              }`}
            name="title"
            value={formData.title}
            placeholder={lang === "fa" ? "موضوع پیام" : "Title"}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </div>
      </div>

      {/* message */}
      <div className="mt-4">
        <textarea
          className={`w-full text-base rtl:text-right placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder  ltr:text-left bg-[#F5F5F5] dark:bg-black rounded-[10px] p-4 border-0 dark:text-white ring-1 ring-transparent focus:ring-light-primary dark:focus:ring-dark-primary outline-none
  ${errors.name
              ? "ring-red-600 focus:ring-red-600"
              : "ring-transparent focus:ring-light-primary dark:focus:ring-dark-primary"
            }`}
          rows={7}
          name="message"
          value={formData.message}
          placeholder={
            lang === "fa"
              ? "پیام خود را بنویسید..."
              : "Your message..."
          }
          onChange={handleChange}
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-5 text-[19px] w-full md:w-[48%] font-bold py-2 rounded-[10px] transition
    ${isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "dark:bg-dark-yellow dark:text-black bg-light-primary text-white"
          }`}
      >
        {isSubmitting
          ? lang === "fa"
            ? "در حال ارسال..."
            : "Sending..."
          : lang === "fa"
            ? "ارسال پیام"
            : "Send"}
      </button>

    </form>
  );
}
