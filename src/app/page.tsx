"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Accordion, AccordionTab } from "primereact/accordion";
import { FaTruck, FaHeadset, FaShieldAlt, FaLeaf } from "react-icons/fa";

// import required modules

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

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [tabs, setTabs] = useState([
    {
      header: "سفارشم کی به دستم میرسه",
      children: (
        <p className="m-0">بستگی داره به اینکه شما کجای ایران ساکن هستید</p>
      ),
    },
    {
      header: "چرا قیمت ثابت وجود ندارد برای اجناس؟",
      children: (
        <p className="m-0">
          قیمت ها دائما درحال نوسان هستن و خود کشاورز ها این قیمت رو تعیین میکنن
        </p>
      ),
    },
    {
      header: "نحوه ی خرید و پرداخت چگونه است؟",
      children: (
        <p className="m-0">
          شما میتونید با مراجعه به صفحه فروشگاه محصول خود را انتخاب کنید و سپس
          با انتخاب محصول مورد نظر خود را خریداری کنید
        </p>
      ),
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [featuredProducts] = useState([
    {
      id: 1,
      name: "سیب قرمز",
      price: 45000,
      discount: 15,
      image: "/images/apple.jpg",
      stock: 10
    },
    {
      id: 2,
      name: "پسته تازه",
      price: 850000,
      discount: 0,
      image: "/images/pistachio.jpg",
      stock: 5
    },
    {
      id: 3,
      name: "زعفران",
      price: 1200000,
      discount: 20,
      image: "/images/saffron.jpg",
      stock: 8
    },
    {
      id: 4,
      name: "انار",
      price: 35000,
      discount: 0,
      image: "/images/pomegranate.jpg",
      stock: 15
    }
  ]);

  const benefits = [
    {
      icon: <FaTruck className="text-4xl" />,
      title: "ارسال سریع",
      description: "ارسال در همان روز سفارش"
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "پشتیبانی 24 ساعته",
      description: "پاسخگویی در تمام ساعات"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "ضمانت اصالت",
      description: "تضمین کیفیت محصولات"
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "محصولات ارگانیک",
      description: "تازه و طبیعی"
    }
  ];

  useEffect(() => {
    setIsClient(true);
    fetchCategories();
    fetchReviews();
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
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  if (!isClient) {
    // اگر SSR است، چیزی رندر نکن
    return null;
  }
  // try {
  //   const cookieStore = await cookies();
  //   const token = cookieStore.get("token");
  //   const isVerify = await verifyJwt(token);

  //   console.log('token =>' , token)

  //   if (!isVerify) {
  //     redirect("login");
  //   }
  // } catch (error) {
  //   redirect('/login')
  // }

  const createDynamicTabs = () => {
    return tabs.map((tab, i) => {
      return (
        <AccordionTab
          key={tab.header}
          header={tab.header}
          disabled={tab.disabled}
        >
          {tab.children}
        </AccordionTab>
      );
    });
  };

  return (
    <div className='px-20 dark:bg-[#0B090A]'>
    <div className="bg-slate-100 dark:bg-[#0B090A]">
        {/* <h3 className="text-xl text-center mb-6">پرفروش ترین ها</h3> */}

      <div className="p-6">
          <Swiper
            spaceBetween={30}
          slidesPerView={1}
            navigation={true}
          pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
        >
          <SwiperSlide>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">تخفیف ویژه میوه‌های فصل</h2>
                <p>تا ۳۰٪ تخفیف برای خریدهای بالای ۵۰۰ هزار تومان</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">ارسال رایگان</h2>
                <p>برای تمام سفارش‌های بالای ۱ میلیون تومان</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">تازه‌ترین محصولات</h2>
                <p>هر روز محصولات تازه از مزارع و باغات</p>
              </div>
            </SwiperSlide>
          </Swiper>

          <h3 className="text-xl text-center my-8">دسته‌بندی محصولات</h3>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-center">{category.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h3 className="text-xl text-center my-8">نظرات مشتریان</h3>
          {reviewsLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{review.username[0]}</span>
                    </div>
                    <div className="mr-4">
                      <h4 className="font-semibold">{review.username}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{review.text}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{review.productTitle}</span>
                    <span>{review.createdAtJalali}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h3 className="text-xl text-center my-8">سوالات متداول</h3>
        <Accordion>{createDynamicTabs()}</Accordion>
      </div>

        <div className="my-12">
          <h3 className="text-xl text-center mb-8">محصولات ویژه</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-gray-200 relative">
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {product.discount}% تخفیف
                    </div>
                  )}
                  {/* تصویر محصول */}
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      {product.discount > 0 ? (
                        <>
                          <span className="text-gray-500 line-through text-sm">{product.price.toLocaleString()} تومان</span>
                          <span className="text-green-500 mr-2">
                            {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} تومان
                          </span>
                        </>
                      ) : (
                        <span className="text-green-500">{product.price.toLocaleString()} تومان</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">موجودی: {product.stock}</span>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">عضویت در خبرنامه</h3>
            <p className="mb-6">برای اطلاع از آخرین محصولات و تخفیف‌ها در خبرنامه ما عضو شوید</p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-green-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                عضویت
              </button>
            </div>
          </div>
      </div>

        <div className="my-12">
          <h3 className="text-xl text-center mb-8">چرا ما را انتخاب کنید؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-green-500 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
    </div>
  );
}
