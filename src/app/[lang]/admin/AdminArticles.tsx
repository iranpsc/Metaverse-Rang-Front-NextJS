"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/utils/lib/supabaseClient";
import CreatableSelect from "react-select/creatable";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface AdminArticlesProps {
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

interface Article {
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
  author: Author;
  tags: Tag[];
  stats: {
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
  };
}

export default function AdminArticles({ loggedInUserData }: AdminArticlesProps) {
if (!["hm-2000003", "hm-2000007" , "hm-2000001"].includes(loggedInUserData.code.trim().toLowerCase())) {
    console.log("LoggedIn code (trimmed):", loggedInUserData.code.trim().toLowerCase());
    return <p  className="mx-auto my-10">دسترسی ندارید</p>;
}


  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<number | null>(null);

  const [form, setForm] = useState<Article>({
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
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false });
    if (!error) {
      const cleaned = (data || []).map(cleanArticle);
      setArticlesList(cleaned);

      // دسته‌ها و زیر دسته‌ها یکتا
      const categories = Array.from(new Set(cleaned.map(a => a.category).filter(Boolean)));
      setAllCategories(categories);

      const subCategories = Array.from(new Set(cleaned.map(a => a.subCategory).filter(Boolean)));
      setAllSubCategories(subCategories);
    }
    setLoading(false);
  };

  const cleanArticle = (article: any): Article => ({
    id: article.id,
    title: article.title || "",
    slug: article.slug || "",
    readingTime: article.readingTime || "",
    image: article.image || "",
    description: article.description || "",
    content: article.content || "",
    category: article.category || "",
    categorySlug: article.categorySlug || "",
    subCategory: article.subCategory || "",
    categoryImage: article.categoryImage || "",
    categoryDec: article.categoryDec || "",
    date: article.date || new Date().toISOString(),
    author: {
      name: article.author?.name || "",
      citizenId: article.author?.citizenId || "",
      avatar: article.author?.avatar || "",
      field: article.author?.field || "",
      bio: article.author?.bio || "",
      socials: {
        telegram: article.author?.socials?.telegram || "",
        whatsapp: article.author?.socials?.whatsapp || "",
        email: article.author?.socials?.email || "",
      },
    },
    tags: Array.isArray(article.tags)
      ? article.tags.map((t: any) => ({ label: t.label || "", slug: t.slug || "" }))
      : [{ label: "", slug: "" }],
    stats: {
      views: article.stats?.views || 0,
      likes: article.stats?.likes || 0,
      dislikes: article.stats?.dislikes || 0,
      comments: article.stats?.comments || 0,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (field: keyof Author | keyof Author["socials"], value: string, isSocial = false) => {
    setForm(prev => ({
      ...prev,
      author: isSocial
        ? { ...prev.author, socials: { ...prev.author.socials, [field]: value } }
        : { ...prev.author, [field]: value },
    }));
  };

  const handleTagChange = (index: number, field: keyof Tag, value: string) => {
    const newTags = [...form.tags];
    newTags[index][field] = value;
    setForm(prev => ({ ...prev, tags: newTags }));
  };

  const handleAddTag = () => setForm(prev => ({ ...prev, tags: [...prev.tags, { label: "", slug: "" }] }));

  const handleRemoveTag = (index: number) => {
    const newTags = form.tags.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, tags: newTags.length ? newTags : [{ label: "", slug: "" }] }));
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article.id || null);
    setForm(cleanArticle(article));
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("آیا از حذف مقاله مطمئن هستید؟")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) console.error(error);
    else setArticlesList(prev => prev.filter(a => a.id !== id));
  };

  const resetForm = () => {
    setForm(cleanArticle({}));
    setEditingArticle(null);
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.description || !form.category) {
      alert("لطفاً همه فیلدهای ضروری را پر کنید!");
      return;
    }

    try {
      if (editingArticle) {
        const { error } = await supabase
          .from("articles")
          .update(form)
          .eq("id", editingArticle);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("articles")
          .insert([form]);
        if (error) throw error;
      }
      resetForm();
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#f8f8f8] dark:bg-black w-full px-5 lg:px-10 py-5 dark:text-white">
      
      <h1 className="text-2xl font-bold mb-4 mt-20 lg:mt-5  px-2 pb-3">پنل مدیریت مقالات</h1>
      <div className="dark:bg-dark-background  bg-white rounded-3xl">

        <form className=" space-y-5" onSubmit={handleAddOrUpdate} style={{ padding: 20,  marginBottom: 40 }}>
          <h2 className="font-semibold mb-2">{editingArticle ? "ویرایش مقاله" : "افزودن مقاله جدید"}</h2>

          <input name="title" placeholder="عنوان" value={form.title} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input name="readingTime" placeholder="زمان مطالعه" value={form.readingTime} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input name="image" placeholder="تصویر مقاله" value={form.image} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />

          <h3>توضیحات کوتاه</h3>
          <ReactQuill theme="snow" value={form.description} onChange={(val) => setForm(prev => ({ ...prev, description: val }))} style={{ marginBottom: 10 }} />

          <h3>محتوا</h3>
          <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm(prev => ({ ...prev, content: val }))} style={{ marginBottom: 10 }} />

          <h3>دسته</h3>
          <CreatableSelect
            value={form.category ? { value: form.category, label: form.category } : null}
            onChange={(val: any) => setForm(prev => ({ ...prev, category: val?.value || "" }))}
            options={allCategories.map(c => ({ value: c, label: c }))}
          />

          <input
  name="categorySlug"
  placeholder="Category Slug  - اسلاک دسته "
  value={form.categorySlug}
  onChange={handleChange}
  className="w-full rounded-lg py-2 px-3 mt-2 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:border-dark-gray border focus:border-2 outline-none"
/>

          <h3>زیر دسته</h3>
          <CreatableSelect
            value={form.subCategory ? { value: form.subCategory, label: form.subCategory } : null}
            onChange={(val: any) => setForm(prev => ({ ...prev, subCategory: val?.value || "" }))}
            options={allSubCategories.map(c => ({ value: c, label: c }))}
          />

          <input name="categoryImage" placeholder="تصویر دسته" value={form.categoryImage} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="mt-5 rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input name="categoryDec" placeholder="توضیح دسته" value={form.categoryDec} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input name="date" placeholder="تاریخ انتشار" value={form.date} onChange={handleChange} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />

          <h3>اطلاعات نویسنده</h3>
          <input className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-textGray dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" placeholder="نام" value={form.author.name} onChange={(e) => handleAuthorChange("name", e.target.value)} style={{ width: "100%", marginBottom: 10 }} />
          <input placeholder="شناسه" value={form.author.citizenId} onChange={(e) => handleAuthorChange("citizenId", e.target.value)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input placeholder="آواتار" value={form.author.avatar} onChange={(e) => handleAuthorChange("avatar", e.target.value)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input placeholder="حوزه فعالیت" value={form.author.field} onChange={(e) => handleAuthorChange("field", e.target.value)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input placeholder="بیوگرافی" value={form.author.bio} onChange={(e) => handleAuthorChange("bio", e.target.value)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input placeholder="تلگرام" value={form.author.socials.telegram} onChange={(e) => handleAuthorChange("telegram", e.target.value, true)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input placeholder="واتساپ" value={form.author.socials.whatsapp} onChange={(e) => handleAuthorChange("whatsapp", e.target.value, true)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
          <input placeholder="ایمیل" value={form.author.socials.email} onChange={(e) => handleAuthorChange("email", e.target.value, true)} style={{ width: "100%", marginBottom: 10 }} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />

          <h3>تگ‌ها</h3>
          {form.tags.map((tag, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <input placeholder="Label" value={tag.label} onChange={(e) => handleTagChange(i, "label", e.target.value)} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
              <input placeholder="Slug" value={tag.slug} onChange={(e) => handleTagChange(i, "slug", e.target.value)} className="rounded-lg py-2 px-3 focus:border-light-primary dark:focus:border-dark-yellow border-lightGray dark:bg-black dark:text-white dark:placeholder:text-white dark:border-dark-gray border focus:border-2 border-solid outline-none" />
              <button type="button" onClick={() => handleRemoveTag(i)} className="bg-red-600 text-white rounded-lg px-2 py-1">حذف</button>
            </div>
          ))}
          <button className="bg-pink-600 text-white rounded-lg px-4 py-1" type="button" onClick={handleAddTag}>افزودن تگ</button>

          <div className="flex items-center gap-4 mt-5">
            <button className="bg-light-primary text-white rounded-lg px-4 py-2" type="submit" >{editingArticle ? "ذخیره تغییرات" : "افزودن مقاله"}</button>
            {editingArticle && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-orange-400 text-white rounded-lg px-4 py-2"
              >
                لغو ویرایش
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-2">لیست مقالات</h2>
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        articlesList.map(article => (
          <div key={article.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <h3 className="font-bold">{article.title}</h3>
            <p>{article.description}</p>
            <p>نویسنده: {article.author.name} | دسته: {article.category} - {article.subCategory} | تاریخ: {article.date}</p>
            <p>تگ‌ها: {article.tags.map(t => t.label).join(", ")}</p>
            <button onClick={() => handleEdit(article)} style={{ marginRight: 10 }}>ویرایش</button>
            <button onClick={() => handleDelete(article.id)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}
