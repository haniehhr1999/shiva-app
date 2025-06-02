"use client";

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const data = await response.json();
        setIsAdmin(data.role === "admin");
        
        if (data.role !== "admin") {
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/login");
      }
    };

    checkAdmin();
    fetchArticles();
  }, [router]);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: "در دریافت مقالات مشکلی پیش آمده است",
        life: 3000
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: "لطفا عنوان و محتوا را وارد کنید",
        life: 3000
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          slug: title.toLowerCase().replace(/\s+/g, "-")
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create article");
      }

      const newArticle = await response.json();
      
      toast.current.show({
        severity: "success",
        summary: "موفق",
        detail: "مقاله با موفقیت ایجاد شد",
        life: 3000
      });

      setTitle("");
      setContent("");
      fetchArticles();
    } catch (error) {
      console.error("Error creating article:", error);
      toast.current.show({
        severity: "error",
        summary: "خطا",
        detail: error.message || "در ایجاد مقاله مشکلی پیش آمده است",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Toast ref={toast} />
      
      <Card title="ایجاد مقاله جدید" className="mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="field">
            <label htmlFor="title" className="block mb-2">عنوان</label>
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              placeholder="عنوان مقاله را وارد کنید"
            />
          </div>

          <div className="field">
            <label htmlFor="content" className="block mb-2">محتوا</label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              config={{
                language: "fa",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "outdent",
                  "indent",
                  "|",
                  "blockQuote",
                  "insertTable",
                  "undo",
                  "redo"
                ]
              }}
            />
          </div>

          <Button
            type="submit"
            label="ذخیره مقاله"
            icon="pi pi-save"
            loading={loading}
            className="w-full"
          />
        </form>
      </Card>

      <Card title="مقالات موجود" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="shadow-md">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
} 