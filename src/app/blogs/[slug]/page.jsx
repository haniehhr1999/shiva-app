"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.slug}`);
        if (!response.ok) throw new Error('خطا در دریافت مقاله');
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">مقاله یافت نشد</h2>
          <Button 
            label="بازگشت به لیست مقالات" 
            icon="pi pi-arrow-right" 
            onClick={() => router.push('/blogs')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          label="بازگشت به لیست مقالات" 
          icon="pi pi-arrow-right" 
          className="mb-6"
          onClick={() => router.push('/blogs')}
        />
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{article.title}</h1>
              <Tag value={article.category} severity="info" />
            </div>
            
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center">
                <i className="pi pi-clock mr-2"></i>
                زمان مطالعه: {article.readingTime}
              </span>
              <span className="flex items-center">
                <i className="pi pi-calendar mr-2"></i>
                تاریخ انتشار: {article.date}
              </span>
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 