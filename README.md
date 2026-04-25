<div align="center">

# 🛒 Shiva App - فروشگاه آنلاین

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=for-the-badge)

**یک فروشگاه آنلاین مدرن و زیبا با Next.js و shadcn/ui**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

---

## 📋 فهرست مطالب

- [✨ ویژگی‌ها](#-ویژگی‌ها)
- [🚀 شروع سریع](#-شروع-سریع)
- [🛠️ تکنولوژی‌ها](#️-تکنولوژی‌ها)
- [📦 کتابخانه‌ها](#-کتابخانه‌ها)
- [👤 ورود به سیستم](#-ورود-به-سیستم)
- [📸 تصاویر](#-تصاویر)
- [🤝 مشارکت](#-مشارکت)

---

## ✨ ویژگی‌ها

### 🎨 رابط کاربری
- ✨ **طراحی مدرن** با استفاده از shadcn/ui
- 🌓 **حالت تاریک/روشن** با قابلیت تغییر خودکار
- 📱 **طراحی واکنش‌گرا** برای تمام دستگاه‌ها
- 🎨 **رنگ‌بندی زیبا** و گرادیان‌های جذاب

### 👥 مدیریت کاربران
- 🔐 **سیستم احراز هویت** با JWT و Cookie
- 👤 **دو نقش کاربری**: کاربر عادی و ادمین
- 📝 **ثبت‌نام و ورود** با ایمیل و رمز عبور
- 🔑 **Token-based Authentication** برای هر کاربر

### 🛍️ فروشگاه
- 🛒 **سبد خرید** با مدیریت کامل
- 📦 **۹ محصول** مختلف
- 💳 **سیستم پرداخت** و تسویه حساب
- 🏷️ **دسته‌بندی محصولات**

### 👨‍💼 پنل ادمین
- 📊 **داشبورد مدیریتی** با نمودارها
- 👥 **مدیریت کاربران**: مشاهده، حذف، ویرایش
- 🔄 **تغییر نقش کاربران**
- 📈 **آمار و گزارشات** با Recharts

### 📝 مقالات و محتوا
- 📰 **بخش مقالات** با دسته‌بندی
- 💬 **سیستم نظرات** برای محصولات
- ⭐ **امتیازدهی** محصولات

---

## 🚀 شروع سریع

### پیش‌نیازها

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### نصب و راه‌اندازی

```bash
# کلون کردن پروژه
git clone https://github.com/yourusername/shiva-app.git

# ورود به پوشه پروژه
cd shiva-app

# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev
```

پروژه در آدرس [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

---

## 🛠️ تکنولوژی‌ها

<div align="center">

| دسته | تکنولوژی |
|------|----------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38bdf8?logo=tailwind-css) |
| **UI Components** | ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000) |
| **Icons** | ![Lucide React](https://img.shields.io/badge/Lucide_React-Latest-FF6B6B) |

</div>

---

## 📦 کتابخانه‌ها

### Core Libraries
- ⚡ **Next.js 13+** - Framework اصلی
- 🔷 **TypeScript** - Type Safety
- 🎨 **Tailwind CSS** - Styling
- 🧩 **shadcn/ui** - کامپوننت‌های UI

### UI & Icons
- 🎯 **Lucide React** - آیکون‌های زیبا
- 🎠 **Swiper.js** - اسلایدر و کاروسل
- 🎨 **React Icons** - آیکون‌های اضافی

### Authentication & Security
- 🔐 **JWT (jose)** - احراز هویت
- 🍪 **Cookies** - مدیریت Cookie
- 🔒 **Next-Auth** - سیستم احراز هویت

### Data & Charts
- 📊 **Recharts** - نمودارها و چارت‌ها
- 💾 **JSON Server** - دیتابیس فیک

### Forms & Validation
- 📝 **React Hook Form** - مدیریت فرم‌ها
- ✅ **Zod** - اعتبارسنجی

---

## 👤 ورود به سیستم

### 🔑 اطلاعات ورود ادمین

```
📧 Email: admin@example.com
🔒 Password: 123456
```

### 👥 نقش‌های کاربری

| نقش | دسترسی |
|-----|--------|
| 👤 **کاربر عادی** | مشاهده محصولات، خرید، سبد خرید |
| 👨‍💼 **ادمین** | تمام دسترسی‌های کاربر + پنل مدیریت |

---

## 📸 تصاویر

<div align="center">

### 🏠 صفحه اصلی
![Home Page](https://via.placeholder.com/800x400/38bdf8/ffffff?text=Home+Page)

### 🛍️ فروشگاه
![Store Page](https://via.placeholder.com/800x400/10b981/ffffff?text=Store+Page)

### 👨‍💼 پنل ادمین
![Admin Dashboard](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Admin+Dashboard)

</div>

---

## 📁 ساختار پروژه

```
shiva-app/
├── 📁 src/
│   ├── 📁 app/              # صفحات Next.js
│   │   ├── 📁 about/         # صفحه درباره ما
│   │   ├── 📁 blogs/        # بخش مقالات
│   │   ├── 📁 contact/      # صفحه تماس
│   │   ├── 📁 login/        # صفحه ورود
│   │   ├── 📁 store/        # صفحه فروشگاه
│   │   └── 📁 dashboard/    # پنل ادمین
│   ├── 📁 components/        # کامپوننت‌های React
│   │   ├── 📁 ui/           # کامپوننت‌های shadcn/ui
│   │   └── ...
│   ├── 📁 lib/              # توابع کمکی
│   └── 📁 context/          # Context API
├── 📁 public/               # فایل‌های استاتیک
├── 📄 db.json              # دیتابیس JSON
└── 📄 package.json         # وابستگی‌ها
```

---

## 🎨 ویژگی‌های طراحی

- ✨ **کامپوننت‌های shadcn/ui** برای UI مدرن
- 🎨 **گرادیان‌های زیبا** در تمام صفحات
- 🌈 **رنگ‌بندی حرفه‌ای** با Tailwind CSS
- 📱 **طراحی Mobile-First**
- ⚡ **انیمیشن‌های نرم** و روان
- 🎯 **تجربه کاربری عالی**

---

## 🤝 مشارکت

مشارکت‌ها، Issues و Pull Request‌ها همیشه خوش‌آمد هستند! 

برای مشارکت:

1. 🍴 Fork کنید
2. 🌿 یک branch جدید بسازید (`git checkout -b feature/AmazingFeature`)
3. 💾 تغییرات را commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push کنید (`git push origin feature/AmazingFeature`)
5. 🔄 Pull Request باز کنید

---

## 📄 لایسنس

این پروژه تحت لایسنس [MIT](https://opensource.org/licenses/MIT) منتشر شده است.

---

## 👨‍💻 توسعه‌دهنده

<div align="center">

**ساخته شده با ❤️ توسط Shiva**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)

</div>

---

<div align="center">

### ⭐ اگر این پروژه را دوست داشتید، یک ستاره بدهید!

Made with ❤️ and Next.js

</div>
