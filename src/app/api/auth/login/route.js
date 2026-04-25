import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await dbConnect();

    const { mobile, password } = await request.json();

    // find user in db
    const existingUser = await User.findOne({
  mobile: mobile,
  password: password
});

    if (!existingUser) {
      return NextResponse.json(
        { error: "این شماره عضو سایت نیست" },
        { status: 401 },
      );
    }

    // Create JWT token with username included
    const token = jwt.sign(
      {
        id: existingUser._id,
        mobile: existingUser.mobile,
        username: existingUser.username,
        role: existingUser.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" },
    );

    console.log({token})

    // create response
    const response = NextResponse.json(
      {
        message: "ورود موفقیت‌آمیز",
        token,
        user: {
          id: existingUser._id,
          username: existingUser.username,
          mobile: existingUser.mobile,
          role: existingUser.role,
        },
      },
      { status: 200 },
    );

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 روز
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "خطا در ورود به سیستم" },
      { status: 500 },
    );
  }
}
