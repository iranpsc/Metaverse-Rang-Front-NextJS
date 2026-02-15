"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/lib/supabaseClient";
import CreatableSelect from "react-select/creatable";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface AdminNewsProps {
  loggedInUserData: { code: string; token: string };
}

interface Author {
  name: string;
  citizenId: string;
  avatar: string;
  field: string;
  bio: string;
  socials: {
    telegram: string;
    whatsapp: string;
    email: string;
  };
}

interface Tag {
  label: string;
  slug: string;
}

interface News {
  id?: number;
  title: string;
  slug: string;
  readingTime: string;
  image: string;
  description: string;
  content: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  categoryImage: string;
  categoryDec: string;
  date: string;
  video: string;           // ← فیلد جدید: لینک ویدیو خبر
  author: Author;
  tags: Tag[];
  stats: {
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
  };
}

export default function AdminNews({ loggedInUserData }: AdminNewsProps) {
  if (!["hm-2000003", "hm-2000007", "hm-2000001"].includes(loggedInUserData.code.trim().toLowerCase())) {
    console.log("LoggedIn code (trimmed):", loggedInUserData.code.trim().toLowerCase());
    return <p className="mx-auto my-10 text-center text-red-600 text-xl">دسترسی ندارید</p>;
  }

  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<number | null>(null);

  const [form, setForm] = useState<News>({
    title: "",
    slug: "",
    readingTime: "",
    image: "",
    description: "",
    content: "",
    category: "",
    categorySlug: "",
    subCategory: "",
    categoryImage: "",
    categoryDec: "",
    date: new Date().toISOString(),
    video: "",                     // مقدار اولیه فیلد ویدیو
    author: {
      name: "",
      citizenId: "",
      avatar: "",
      field: "",
      bio: "",
      socials: {
        telegram: "",
        whatsapp: "",
        email: "",
      },
    },
    tags: [{ label: "", slug: "" }],
    stats: { views: 0, likes: 0, dislikes: 0, comments: 0 },
  });

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("خطا در بارگذاری اخبار:", error);
    } else {
      const cleaned = (data || []).map(cleanNews);
      setNewsList(cleaned);

      const categories = Array.from(new Set(cleaned.map((n) => n.category).filter(Boolean)));
      setAllCategories(categories);

      const subCategories = Array.from(new Set(cleaned.map((n) => n.subCategory).filter(Boolean)));
      setAllSubCategories(subCategories);
    }
    setLoading(false);
  };

  const cleanNews = (item: any): News => ({
    id: item.id,
    title: item.title || "",
    slug: item.slug || "",
    readingTime: item.readingTime || "",
    image: item.image || "",
    description: item.description || "",
    content: item.content || "",
    category: item.category || "",
    categorySlug: item.categorySlug || "",
    subCategory: item.subCategory || "",
    categoryImage: item.categoryImage || "",
    categoryDec: item.categoryDec || "",
    date: item.date || new Date().toISOString(),
    video: item.video || "",                    // ← اضافه شد
    author: {
      name: item.author?.name || "",
      citizenId: item.author?.citizenId || "",
      avatar: item.author?.avatar || "",
      field: item.author?.field || "",
      bio: item.author?.bio || "",
      socials: {
        telegram: item.author?.socials?.telegram || "",
        whatsapp: item.author?.socials?.whatsapp || "",
        email: item.author?.socials?.email || "",
      },
    },
    tags: Array.isArray(item.tags)
      ? item.tags.map((t: any) => ({ label: t.label || "", slug: t.slug || "" }))
      : [{ label: "", slug: "" }],
    stats: {
      views: item.stats?.views || 0,
      likes: item.stats?.likes || 0,
      dislikes: item.stats?.dislikes || 0,
      comments: item.stats?.comments || 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (
    field: keyof Author | keyof Author["socials"],
    value: string,
    isSocial = false
  ) => {
    setForm((prev) => ({
      ...prev,
      author: isSocial
        ? { ...prev.author, socials: { ...prev.author.socials, [field as string]: value } }
        : { ...prev.author, [field]: value },
    }));
  };

  const handleTagChange = (index: number, field: keyof Tag, value: string) => {
    const newTags = [...form.tags];
    newTags[index][field] = value;
    setForm((prev) => ({ ...prev, tags: newTags }));
  };

  const handleAddTag = () => {
    setForm((prev) => ({ ...prev, tags: [...prev.tags, { label: "", slug: "" }] }));
  };

  const handleRemoveTag = (index: number) => {
    const newTags = form.tags.filter((_, i) => i !== index);
    setForm((prev) => ({
      ...prev,
      tags: newTags.length ? newTags : [{ label: "", slug: "" }],
    }));
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem.id || null);
    setForm(cleanNews(newsItem));
  };

  const handleDelete = async (id?: number) => {
    if (!id || !confirm("آیا از حذف این خبر مطمئن هستید؟")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) console.error(error);
    else setNewsList((prev) => prev.filter((n) => n.id !== id));
  };

  const resetForm = () => {
    setForm(cleanNews({}));
    setEditingNews(null);
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.content || !form.category) {
      alert("فیلدهای ضروری (عنوان، توضیح کوتاه، محتوا، دسته) را پر کنید");
      return;
    }

    try {
      if (editingNews) {
        const { error } = await supabase.from("news").update(form).eq("id", editingNews);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert([form]);
        if (error) throw error;
      }
      resetForm();
      fetchNews();
    } catch (err) {
      console.error(err);
      alert("خطا در ذخیره‌سازی");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950  p-5 lg:p-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 mt-4">پنل مدیریت اخبار</h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8 mb-12">
        <form onSubmit={handleAddOrUpdate} className="space-y-7">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3 dark:border-gray-700">
            {editingNews ? "ویرایش خبر" : "افزودن خبر جدید"}
          </h2>

          {/* عنوان و slug و زمان مطالعه */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-medium">عنوان خبر *</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" required />
            </div>
            <div>
              <label className="block mb-2 font-medium">Slug (لینک یکتا)</label>
              <input name="slug" value={form.slug} onChange={handleChange} className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block mb-2 font-medium">زمان مطالعه</label>
              <input name="readingTime" value={form.readingTime} onChange={handleChange} placeholder="مثال: ۶ دقیقه" className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>

          {/* تصویر اصلی + ویدیو */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">تصویر اصلی خبر</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block mb-2 font-medium">لینک ویدیو خبر</label>
              <input
                name="video"
                value={form.video}
                onChange={handleChange}
                placeholder="https://www.aparat.com/v/xxxxx  یا یوتیوب / فایل مستقیم"
                className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          {/* توضیح کوتاه */}
          <div>
            <label className="block mb-2 font-medium">توضیحات کوتاه (متا دسکریپشن) *</label>
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(val) => setForm((p) => ({ ...p, description: val }))}
              className="bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>

          {/* محتوای اصلی */}
          <div>
            <label className="block mb-2 font-medium">محتوای خبر *</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={(val) => setForm((p) => ({ ...p, content: val }))}
              className="bg-white dark:bg-gray-800 rounded-lg min-h-[300px]"
            />
          </div>

          {/* دسته‌بندی و زیر دسته */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">دسته‌بندی *</label>
              <CreatableSelect
                value={form.category ? { value: form.category, label: form.category } : null}
                onChange={(opt: any) => setForm((p) => ({ ...p, category: opt?.value || "" }))}
                options={allCategories.map((c) => ({ value: c, label: c }))}
                placeholder="انتخاب یا تایپ دسته جدید"
                formatCreateLabel={(input: any) => `ایجاد دسته جدید: ${input}`}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">زیر دسته</label>
              <CreatableSelect
                value={form.subCategory ? { value: form.subCategory, label: form.subCategory } : null}
                onChange={(opt: any) => setForm((p) => ({ ...p, subCategory: opt?.value || "" }))}
                options={allSubCategories.map((c) => ({ value: c, label: c }))}
                placeholder="اختیاری"
              />
            </div>
          </div>

          {/* اسلاگ و تصویر و توضیح دسته */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-medium">Slug دسته</label>
              <input name="categorySlug" value={form.categorySlug} onChange={handleChange} className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block mb-2 font-medium">تصویر دسته‌بندی</label>
              <input name="categoryImage" value={form.categoryImage} onChange={handleChange} className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
            <div>
              <label className="block mb-2 font-medium">توضیح کوتاه دسته</label>
              <input name="categoryDec" value={form.categoryDec} onChange={handleChange} className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>

          {/* تاریخ + نویسنده */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">تاریخ انتشار</label>
              <input
                type="datetime-local"
                name="date"
                value={form.date.slice(0, 16)}
                onChange={(e) => setForm((p) => ({ ...p, date: new Date(e.target.value).toISOString() }))}
                className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            {/* فیلدهای نویسنده در ادامه ... */}
          </div>

          {/* نویسنده */}
          <div className="border-t pt-6 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">اطلاعات نویسنده</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input placeholder="نام نویسنده" value={form.author.name} onChange={(e) => handleAuthorChange("name", e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
              <input placeholder="شناسه شهروندی" value={form.author.citizenId} onChange={(e) => handleAuthorChange("citizenId", e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
              <input placeholder="لینک آواتار" value={form.author.avatar} onChange={(e) => handleAuthorChange("avatar", e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
              <input placeholder="حوزه فعالیت" value={form.author.field} onChange={(e) => handleAuthorChange("field", e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
              <input placeholder="بیوگرافی کوتاه" value={form.author.bio} onChange={(e) => handleAuthorChange("bio", e.target.value)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 md:col-span-2 lg:col-span-1" />
            </div>

            <h4 className="font-medium mt-6 mb-3">شبکه‌های اجتماعی نویسنده</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input placeholder="تلگرام" value={form.author.socials.telegram} onChange={(e) => handleAuthorChange("telegram", e.target.value, true)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
              <input placeholder="واتساپ" value={form.author.socials.whatsapp} onChange={(e) => handleAuthorChange("whatsapp", e.target.value, true)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
              <input placeholder="ایمیل" value={form.author.socials.email} onChange={(e) => handleAuthorChange("email", e.target.value, true)} className="p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>

          {/* تگ‌ها */}
          <div className="border-t pt-6 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4">تگ‌ها</h3>
            {form.tags.map((tag, i) => (
              <div key={i} className="flex gap-3 mb-3 items-center">
                <input
                  placeholder="نام تگ (label)"
                  value={tag.label}
                  onChange={(e) => handleTagChange(i, "label", e.target.value)}
                  className="flex-1 p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                />
                <input
                  placeholder="slug تگ"
                  value={tag.slug}
                  onChange={(e) => handleTagChange(i, "slug", e.target.value)}
                  className="flex-1 p-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                />
                <button type="button" onClick={() => handleRemoveTag(i)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                  حذف
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddTag} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg mt-2">
              + افزودن تگ جدید
            </button>
          </div>

          {/* دکمه‌های نهایی */}
          <div className="flex flex-wrap gap-4 pt-8">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg">
              {editingNews ? "ذخیره تغییرات" : "انتشار خبر"}
            </button>

            {editingNews && (
              <button type="button" onClick={resetForm} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium text-lg">
                لغو ویرایش
              </button>
            )}
          </div>
        </form>
      </div>

           <h2 className="text-xl font-semibold mt-10 mb-4">لیست اخبار</h2>

      {loading ? (
        <p className="text-center py-10">در حال بارگذاری اخبار...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center py-10 text-gray-500">خبری ثبت نشده است</p>
      ) : (
        <div className="grid gap-4">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="border dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg mb-2">{news.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{news.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                نویسنده: {news.author.name} • دسته: {news.category} {news.subCategory && `- ${news.subCategory}`} • {new Date(news.date).toLocaleDateString("fa-IR")}
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(news)} className="text-blue-600 hover:underline">
                  ویرایش
                </button>
                <button onClick={() => handleDelete(news.id)} className="text-red-600 hover:underline">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* اگر نیاز به تغییر ظاهر لیست دارید بگویید تا آن بخش را هم به‌روزرسانی کنم */}
    </div>
  );
}