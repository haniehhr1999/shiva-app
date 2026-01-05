import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // استخراج دسته‌بندی‌ها از محصولات
    const categoryMap: { [key: string]: { name: string; image: string } } = {
      'برنج': { name: 'برنج', image: '/images/rice1.jpg' },
      'زیتون': { name: 'زیتون', image: '/images/olive1.jpg' },
      'خشکبار': { name: 'خشکبار', image: '/images/reshte.jpg' },
      'سایر': { name: 'سایر', image: '/images/kerak.jpg' }
    };

    const categories = Array.from(new Set(data.products.map((product: any) => {
      // استخراج دسته‌بندی از عنوان محصول
      const title = product.title;
      if (title.includes('برنج')) return 'برنج';
      if (title.includes('زیتون')) return 'زیتون';
      if (title.includes('رشته')) return 'خشکبار';
      return 'سایر';
    }))).map((category: string) => ({
      id: category,
      name: categoryMap[category]?.name || category,
      image: categoryMap[category]?.image || '/images/placeholder.svg'
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    return NextResponse.json({ error: 'Error reading categories' }, { status: 500 });
  }
} 