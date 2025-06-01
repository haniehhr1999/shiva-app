"use client";

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { Tag } from "primereact/tag";

export default function BlogsPage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('خطا در دریافت مقالات');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">مقالات آموزشی</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card 
            key={article.id}
            className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => router.push(`/blogs/${article.slug}`)}
          >
            <div className="p-4">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{article.title}</h3>
                <Tag value={article.category} severity="info" />
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.content.replace(/<[^>]*>/g, '')}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">زمان مطالعه: {article.readingTime}</span>
                <Button 
                  icon="pi pi-arrow-left" 
                  className="p-button-text" 
                  label="ادامه مطلب"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}