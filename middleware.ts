import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // اجازه دسترسی به صفحات عمومی بدون نیاز به توکن
  const publicPaths = ['/login', '/register', '/'];
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    // ریدایرکت به صفحه لاگین
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // اعتبارسنجی توکن با jsonwebtoken (همان کتابخانه‌ای که در login استفاده می‌شود)
    const decoded = jwt.verify(token, SECRET) as any;
    
    // چک کردن دسترسی admin برای مسیر dashboard
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      if (!decoded.role || decoded.role !== 'admin') {
        // اگر کاربر admin نیست، به صفحه اصلی ریدایرکت کن
        const homeUrl = new URL('/', request.url);
        return NextResponse.redirect(homeUrl);
      }
    }

    // اگر درست بود، اجازه ادامه دسترسی
    return NextResponse.next();
  } catch (error) {
    // اگر توکن نامعتبر بود، حذف کوکی و ریدایرکت به صفحه ورود
    console.error('Middleware error:', error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// مسیرهایی که middleware باید روی آنها اجرا شود:
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
