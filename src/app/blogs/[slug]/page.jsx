"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clock, Calendar, BookOpen, Home } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Skeleton className="h-10 w-48 mb-6" />
          <Card>
            <Skeleton className="h-96 w-full" />
            <CardContent className="p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-6" />
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Card className="text-center py-16 border-2 border-destructive/20">
            <CardContent>
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-4">مقاله یافت نشد</h2>
              <p className="text-muted-foreground mb-6">
                متأسفانه مقاله مورد نظر شما پیدا نشد
              </p>
              <Button 
                onClick={() => router.push('/blogs')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <ArrowRight className="w-4 h-4 ml-2" />
                بازگشت به لیست مقالات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost"
          onClick={() => router.push('/blogs')}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت به لیست مقالات
        </Button>
        
        {/* Article Card */}
        <Card className="overflow-hidden border-2 shadow-2xl bg-gradient-to-br from-white to-muted/30 dark:from-gray-900 dark:to-muted/20">
          {/* Hero Image */}
          <div className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-3 bg-white/90 dark:bg-gray-900/90 text-foreground">
                {article.category || 'عمومی'}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {article.title}
              </h1>
            </div>
          </div>
          
          {/* Article Content */}
          <CardContent className="p-6 md:p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>زمان مطالعه: {article.readingTime || '۵ دقیقه'}</span>
              </div>
              {article.date && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>تاریخ انتشار: {article.date}</span>
                  </div>
                </>
              )}
            </div>

            <Separator className="mb-6" />

            {/* Article Body */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        {/* Back to Blogs Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => router.push('/blogs')}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 border-2"
          >
            <BookOpen className="w-4 h-4 ml-2" />
            مشاهده سایر مقالات
          </Button>
        </div>
      </div>
    </div>
  );
}
