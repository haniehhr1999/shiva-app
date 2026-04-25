// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    console.log("1. دریافت درخواست");
    
    await dbConnect();
    console.log("2. اتصال به دیتابیس موفق");
    
    const { username, mobile, email, pass, selectedProvince, selectedCity } = await request.json();
    console.log("3. اطلاعات:", { username, mobile, email, selectedProvince, selectedCity });
    
    // بررسی کاربر تکراری
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }, { username }] });
    
    if (existingUser) {
      console.log("4. کاربر تکراری");
      return NextResponse.json({ error: "این کاربر قبلاً ثبت نام کرده" }, { status: 400 });
    }
    
    // ساخت کاربر جدید (بدون هش کردن رمز)
    const newUser = await User.create({
      username,
      mobile,
      email: email.toLowerCase(),
      password: pass,  // مستقیم ذخیره کن
      selectedProvince,
      selectedCity,
    });
    
    console.log("5. کاربر ساخته شد:", newUser._id);
    
    return NextResponse.json({ 
      message: "ثبت‌نام موفق", 
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        mobile: newUser.mobile,
        selectedProvince: newUser.selectedProvince,
        selectedCity: newUser.selectedCity,
      }
    });
    
  } catch (error) {
    console.error("❌ خطا:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}