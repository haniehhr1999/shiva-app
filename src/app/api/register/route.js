import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function POST(request) {
  try {
    const { username, email, pass } = await request.json();

    const payload = {
      username,
      email,
      pass,
      role: "user",
    };


    console.log('payload =>' , payload )

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET);

    // برگردوندن توکن در کوکی به صورت HttpOnly
    const response = NextResponse.json({ message: "Token created" });
    response.cookies.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60, // 2 ساعت
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
