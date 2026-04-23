// app/api/sms/send/route.js
import { NextResponse } from 'next/server';
import connectToDB from '@/lib/mongodb'; // مسیر اتصال دیتابیس خود را تنظیم کنید

export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();
    console.log("Body ->", body);

    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: "شماره تلفن الزامی است" },
        { status: 400 }
      );
    }

    const date = new Date();
    const expTime = date.getTime() + 30000; // اصلاح فرمت زمان

    const code = Math.floor(Math.random() * 90000) + 10000; // کد ۵ رقمی

    // ارسال درخواست به ippanel
    const response = await fetch("https://api.iranpayamak.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        op: "pattern",
        user: "09921558293",
        pass: "sabzLearn12!@",
        fromNum: "3000505",
        toNum: phone,
        patternCode: "40hB7OXoYk", // کد الگوی خود را وارد کنید
        inputData: [
          {
            code: code, // پارامتر ارسال کد
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        code: code,
        expTime: expTime,
        message: "کد با موفقیت ارسال شد",
      });
    } else {
      return NextResponse.json(
        { error: "خطا در ارسال پیامک", details: data },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}