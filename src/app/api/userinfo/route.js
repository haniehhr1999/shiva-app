import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function GET(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.log('******* token nist')
    return NextResponse.json({ username: null }, { status: 401 });
  }

  try {
    const payload = decodeJwt(token);
    const username = payload.username || payload.email || null;

    return NextResponse.json({ username });
  } catch (e) {
    return NextResponse.json({ username: null }, { status: 401 });
  }
}
