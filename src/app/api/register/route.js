import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import fs from 'fs';
import path from 'path';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export async function POST(request) {
  try {
    const { username, email, pass } = await request.json();

    // Read existing users from db.json
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Check if user already exists
    const existingUser = dbData.users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Create new user
    const newUser = {
      id: dbData.users.length + 1,
      username,
      email,
      role: "user",
      purchases: []
    };

    // Add new user to users array
    dbData.users.push(newUser);

    // Write updated data back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    const payload = {
      username,
      email,
      pass,
      role: "user",
    };

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(SECRET);

    // برگردوندن توکن در کوکی به صورت HttpOnly
    const response = NextResponse.json({ message: "User registered successfully" });
    response.cookies.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60, // 2 ساعت
      path: "/",
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
