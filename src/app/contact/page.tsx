import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B090A] py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-20">
        <h1 className="text-4xl font-bold text-[#38b000] text-center mb-12">
          تماس با ما
        </h1>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Physical Address */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#38b000] mb-6 flex items-center">
              <FaMapMarkerAlt className="ml-2" />
              آدرس دفتر مرکزی
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              گیلان، رشت، خیابان امام خمینی، خیابان شهید بهشتی، پلاک ۱۲۳
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mt-4">
              ساعت کاری: شنبه تا چهارشنبه ۹ صبح تا ۶ عصر
            </p>
          </div>

          {/* Contact Numbers */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#38b000] mb-6 flex items-center">
              <FaPhone className="ml-2" />
              شماره‌های تماس
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                <span className="font-bold">مدیرعامل:</span> ۰۹۱۲۳۴۵۶۷۸۹
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                <span className="font-bold">مدیر فروش:</span> ۰۹۱۲۳۴۵۶۷۸۸
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                <span className="font-bold">پشتیبانی:</span> ۰۱۳۱۲۳۴۵۶۷۸
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-[#38b000] mb-6 text-center">
            شبکه‌های اجتماعی
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="https://instagram.com/your_instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaInstagram className="text-2xl ml-2" />
              <span>اینستاگرام</span>
            </a>
            <a
              href="https://t.me/your_telegram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaTelegram className="text-2xl ml-2" />
              <span>تلگرام</span>
            </a>
            <a
              href="https://wa.me/989123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaWhatsapp className="text-2xl ml-2" />
              <span>واتساپ</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#38b000] mb-6 text-center">
            ارسال پیام
          </h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#38b000] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#38b000] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">
                موضوع
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#38b000] focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                پیام
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#38b000] focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#38b000] text-white px-8 py-3 rounded-lg hover:bg-[#2d8a00] transition-colors"
              >
                ارسال پیام
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 