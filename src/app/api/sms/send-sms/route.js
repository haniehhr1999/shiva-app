// app/api/sms/send/route.js
import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb"; // مسیر اتصال دیتابیس خود را تنظیم کنید

export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();
    console.log("Body ->", body);

    const { mobile } = body;

    if (!mobile) {
      return NextResponse.json(
        { error: "شماره تلفن الزامی است" },
        { status: 400 },
      );
    }

    // 1. دریافت توکن (همان مرحله قبلی)
    const loginResponse = await fetch(
      "https://api.iranpayamak.com/ws/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: process.env.SMS_USERNAME,
          password: process.env.SMS_PASSWORD,
        }),
      },
    );

    const loginData = await loginResponse.json();
    const token = loginData.token;


    const smsResponse = await fetch(
      "https://api.iranpayamak.com/ws/v1/sms/pattern",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: mobile,
          patternId: "40hB7OXoYk", // شناسه الگویی که در پنل ساختی
          params: [], // اگر الگو پارامتر داشت اینجا مقدار می‌دی
          //     op: "pattern",
          //     user: "09921558293",
          //     pass: "sabzLearn12!@",
          //     fromNum: "3000505",
          //     toNum: mobile,
          //     patternCode: "40hB7OXoYk",
          //     inputData: [
          //       {
          //         code: code,
          //       },
          //     ],
        }),
      },
    );

    const result = await smsResponse.json();

    return NextResponse.json({
      success: true,
      referenceId: result.referenceId, // برای رهگیری در مرحله تأیید
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
