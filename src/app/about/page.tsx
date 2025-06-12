import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B090A]">
      {/* Hero Section */}
      

      {/* Introduction Section */}
      <section className="py-16 px-4 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#38b000] mb-6 text-center">
            داستان ما
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify">
            ما با افتخار از سال ۱۳۹۵ در زمینه عرضه محصولات غذایی با کیفیت فعالیت می‌کنیم. 
            هدف ما ارائه بهترین محصولات با قیمت مناسب و خدمات پس از فروش عالی به مشتریان عزیزمان است.
            با تکیه بر تجربه و تخصص خود، همواره در تلاش هستیم تا رضایت مشتریان را جلب کنیم.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-justify mt-6">
            داستان ما با یک زوج جوان گیلانی آغاز شد که با عشق به سرزمین مادری و محصولات اصیل آن، 
            تصمیم گرفتند پلی باشند میان تولیدکنندگان محلی و مصرف‌کنندگان. امروز، پس از سال‌ها تلاش و 
            پشتکار، توانسته‌ایم اعتماد هزاران مشتری را جلب کنیم. مشتریانی که می‌دانند محصولات ما 
            مستقیماً از باغ‌ها و مزارع گیلان به دستشان می‌رسد، بدون هیچ واسطه‌ای. این اعتماد، 
            بزرگترین سرمایه ماست و ما هر روز برای حفظ و تقویت آن تلاش می‌کنیم. سفارشات شما در 
            کمترین زمان ممکن آماده و ارسال می‌شود، چون معتقدیم مشتریان ما ارزش بهترین خدمات را دارند.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-[#38b000] mb-4">
                ماموریت ما
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ارائه محصولات غذایی با کیفیت و سالم به مشتریان، با رعایت استانداردهای بهداشتی و 
                قیمت‌گذاری منصفانه، در کنار خدمات پس از فروش مطلوب.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-[#38b000] mb-4">
                چشم‌انداز ما
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                تبدیل شدن به برند پیشرو در زمینه عرضه محصولات غذایی با کیفیت در سطح کشور و 
                توسعه فعالیت‌های خود در بازارهای بین‌المللی.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-[#38b000] mb-12 text-center">
          ارزش‌های ما
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#38b000] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">کیفیت</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ارائه محصولات با بالاترین کیفیت و استانداردهای بهداشتی
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#38b000] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">منصفانه</h3>
            <p className="text-gray-600 dark:text-gray-300">
              قیمت‌گذاری منصفانه و شفاف برای تمام محصولات
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#38b000] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">مشتری‌مداری</h3>
            <p className="text-gray-600 dark:text-gray-300">
              رضایت مشتری اولویت اصلی ما در تمام مراحل
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 md:px-20">
          <h2 className="text-3xl font-bold text-[#38b000] mb-12 text-center">
            تیم ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/team-1.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">علی محمدی</h3>
                <p className="text-[#38b000] mb-2">مدیرعامل</p>
                <p className="text-gray-600 dark:text-gray-300">
                  با بیش از ۱۵ سال تجربه در صنعت غذایی
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/team-2.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">مریم احمدی</h3>
                <p className="text-[#38b000] mb-2">مدیر کیفیت</p>
                <p className="text-gray-600 dark:text-gray-300">
                  متخصص کنترل کیفیت با مدرک دکتری صنایع غذایی
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/team-3.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">رضا کریمی</h3>
                <p className="text-[#38b000] mb-2">مدیر فروش</p>
                <p className="text-gray-600 dark:text-gray-300">
                  با سابقه درخشان در مدیریت فروش و بازاریابی
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#38b000] mb-6">
            با ما در ارتباط باشید
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            برای هرگونه سوال، پیشنهاد یا همکاری با ما در تماس باشید
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#38b000] text-white px-8 py-3 rounded-lg hover:bg-[#2d8a00] transition-colors"
          >
            تماس با ما
          </a>
        </div>
      </section>
    </div>
  );
} 