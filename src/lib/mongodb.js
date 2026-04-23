// lib/mongodb.js
import mongoose from 'mongoose';

// آدرس ذخیره شده در .env.local را میخوانیم
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('لطفا متغیر MONGODB_URI را در .env.local تعریف کنید');
}

// در محیط توسعه (development)، Next.js مدام فایل ها را ریلود می‌کند.
// ما اتصال را در شی `global` ذخیره می‌کنیم تا از بین نرود.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // اگر اتصال وجود دارد، همان را برگردان
    return cached.conn;
  }

  if (!cached.promise) {
    // اگر اتصال در حال انجام است، صبر کن تا انجام شود
    const opts = {
      bufferCommands: false,
      // اختیاری: تعداد حداکثر اتصالات همزمان در Serverless (Vercel)
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ اتصال به MongoDB با موفقیت برقرار شد');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ خطا در اتصال به دیتابیس:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;