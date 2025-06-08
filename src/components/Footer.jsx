import React from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="grid grid-cols-4 gap-6 bg-red-100 dark:bg-[#161A1D] px-15 py-10 transition-colors duration-300">
      
      <div className="p-4 rounded-lg">
        <h4 className="text-gray-800 dark:text-gray-200 font-bold mb-4">درباره ما</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          ما با بیش از ۱۰ سال تجربه در زمینه فروش محصولات دیجیتال، همواره در تلاشیم تا بهترین خدمات را به مشتریان خود ارائه دهیم.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <FaFacebook className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div className="p-4 rounded-lg">
        <h4 className="text-gray-800 dark:text-gray-200 font-bold mb-4">دسترسی سریع</h4>
        <ul className="space-y-2">
          <li>
            <Link href="/store" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              فروشگاه
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              درباره ما
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              تماس با ما
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              وبلاگ
            </Link>
          </li>
        </ul>
      </div>

      <div className="p-4 rounded-lg">
        <h4 className="text-gray-800 dark:text-gray-200 font-bold mb-4">تماس با ما</h4>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <FaPhone className="ml-2" />
            <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
          </li>
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <FaEnvelope className="ml-2" />
            <span>info@example.com</span>
          </li>
          <li className="flex items-center text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="ml-2" />
            <span>تهران، خیابان ولیعصر</span>
          </li>
        </ul>
      </div>

      <div className="p-4 rounded-lg">
        <h4 className="text-gray-800 dark:text-gray-200 font-bold mb-4">خبرنامه</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          برای اطلاع از آخرین محصولات و تخفیف‌ها، در خبرنامه ما عضو شوید.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-l-lg hover:bg-blue-600 transition-colors duration-300">
            عضویت
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
