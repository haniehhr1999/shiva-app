import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // اگر توکن نیست، اجازه میدیم به صفحه ورود یا صفحه اول که توکن ساخته میشه بره
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.next();
    }
    // ریدایرکت به صفحه لاگین یا صفحه ساخت توکن
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // اعتبارسنجی توکن
    await jwtVerify(token, SECRET);
    // اگر درست بود، اجازه ادامه دسترسی
    return NextResponse.next();
  } catch (error) {
    // اگر توکن نامعتبر بود، حذف کوکی و ریدایرکت به صفحه ورود
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// مسیرهایی که middleware باید روی آنها اجرا شود:
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
