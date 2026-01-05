"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FaTruck, FaHeadset, FaShieldAlt, FaLeaf, FaStar, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductItem from "@/components/ProductItem";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Review {
  id: number;
  productId: number;
  productTitle: string;
  userId: number;
  username: string;
  text: string;
  rating: number;
  createdAt: string;
  createdAtJalali: string;
}

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
  discount: number;
  img: string;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [email, setEmail] = useState("");

  const tabs = [
    {
      header: "سفارشم کی به دستم میرسه؟",
      children: (
        <p className="text-muted-foreground leading-relaxed">
          بستگی داره به اینکه شما کجای ایران ساکن هستید. برای شهرهای بزرگ معمولاً ۲۴ تا ۴۸ ساعت و برای شهرهای کوچک ۳ تا ۵ روز کاری زمان می‌بره.
        </p>
      ),
    },
    {
      header: "چرا قیمت ثابت وجود ندارد برای اجناس؟",
      children: (
        <p className="text-muted-foreground leading-relaxed">
          قیمت‌ها دائماً در حال نوسان هستند و خود کشاورزها این قیمت را تعیین می‌کنند. ما مستقیماً از مزرعه به شما می‌فروشیم، پس قیمت‌ها بر اساس شرایط بازار و فصل تغییر می‌کنند.
        </p>
      ),
    },
    {
      header: "نحوه خرید و پرداخت چگونه است؟",
      children: (
        <p className="text-muted-foreground leading-relaxed">
          شما می‌تونید با مراجعه به صفحه فروشگاه محصول خود را انتخاب کنید و سپس با انتخاب محصول مورد نظر خود را خریداری کنید. پرداخت به صورت آنلاین و یا پرداخت در محل امکان‌پذیر است.
        </p>
      ),
    },
  ];

  const benefits = [
    {
      icon: <FaTruck className="text-4xl" />,
      title: "ارسال سریع",
      description: "ارسال در همان روز سفارش",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "پشتیبانی 24 ساعته",
      description: "پاسخگویی در تمام ساعات",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "ضمانت اصالت",
      description: "تضمین کیفیت محصولات",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "محصولات ارگانیک",
      description: "تازه و طبیعی",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
    },
  ];

  useEffect(() => {
    setIsClient(true);
    fetchCategories();
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data.slice(0, 6)); // فقط 6 تا نمایش بده
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      // نمایش 4 محصول اول با تخفیف یا پرفروش
      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    alert("با تشکر! شما در خبرنامه ما عضو شدید.");
    setEmail("");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section با Swiper */}
      <section className="relative overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          className="h-[500px] md:h-[600px]"
        >
          <SwiperSlide>
            <div className="relative h-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-2" />
                  تخفیف ویژه
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  تخفیف ویژه میوه‌های فصل
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  تا ۳۰٪ تخفیف برای خریدهای بالای ۵۰۰ هزار تومان
                </p>
                <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 text-lg px-8 py-6">
                  <FaShoppingCart className="ml-2" />
                  خرید کنید
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <FaTruck className="w-3 h-3 mr-2" />
                  ارسال رایگان
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  ارسال رایگان
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  برای تمام سفارش‌های بالای ۱ میلیون تومان
                </p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6">
                  مشاهده محصولات
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3 mr-2" />
                  محصولات تازه
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  تازه‌ترین محصولات
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  هر روز محصولات تازه از مزارع و باغات
                </p>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 text-lg px-8 py-6">
                  خرید کنید
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <div className="container mx-auto px-4 md:px-6 lg:px-20 py-12">
        {/* دسته‌بندی محصولات */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">دسته‌بندی محصولات</h2>
              <p className="text-muted-foreground">محصولات تازه و با کیفیت</p>
            </div>
            <Link href="/store">
              <Button variant="outline" className="hidden md:flex">
                مشاهده همه
                <FaArrowLeft className="mr-2" />
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-24 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/store?category=${category.name}`}>
                  <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image || '/images/placeholder.svg'}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* محصولات ویژه */}
        {products.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">محصولات ویژه</h2>
                </div>
                <p className="text-muted-foreground">پرفروش‌ترین و محبوب‌ترین محصولات</p>
              </div>
              <Link href="/store">
                <Button variant="outline" className="hidden md:flex">
                  مشاهده همه
                  <FaArrowLeft className="mr-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  body={product.body}
                  price={product.price}
                  img={product.img}
                  discount={product.discount}
                />
              ))}
            </div>
          </section>
        )}

        {/* نظرات مشتریان */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">نظرات مشتریان</h2>
              <p className="text-muted-foreground">تجربه خرید مشتریان ما</p>
            </div>
          </div>
          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-20 w-20 rounded-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </Card>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                      {review.username[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{review.username}</h4>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? "fill-current" : "text-gray-300"}
                            size={14}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{review.text}</p>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{review.productTitle}</span>
                    <span className="text-muted-foreground">{review.createdAtJalali}</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">هنوز نظری ثبت نشده است</p>
            </Card>
          )}
        </section>

        {/* سوالات متداول */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">سوالات متداول</h2>
          <Card className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {tabs.map((tab, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="px-6">
                  <AccordionTrigger className="text-right hover:no-underline">
                    {tab.header}
                  </AccordionTrigger>
                  <AccordionContent className="text-right">
                    {tab.children}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        {/* عضویت در خبرنامه */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
            <CardContent className="p-8 md:p-12 text-center relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">عضویت در خبرنامه</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                برای اطلاع از آخرین محصولات، تخفیف‌های ویژه و پیشنهادات خاص در خبرنامه ما عضو شوید
              </p>
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  عضویت
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* چرا ما را انتخاب کنید */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">چرا ما را انتخاب کنید؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
              >
                <div className={`${benefit.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
