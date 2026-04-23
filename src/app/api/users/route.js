// app/api/users/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    // 1. اتصال به دیتابیس
    await dbConnect();

    // 2. دریافت اطلاعات از درخواست
    const body = await request.json();
    
    // 3. ایجاد کاربر جدید در دیتابیس
    const newUser = await User.create(body);

    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const users = await User.find({}); // دریافت همه کاربران
  return NextResponse.json({ users });
}