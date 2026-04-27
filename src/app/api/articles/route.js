import { dbConnect } from '@/lib/mongodb';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

// GET - دریافت همه مقالات با صفحه‌بندی
export async function GET(request) {
  try {
    await dbConnect();
    
    // دریافت پارامترهای query string
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'publishDate';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    
    // محاسبه تعداد آیتم‌هایی که باید skip بشه
    const skip = (page - 1) * limit;
    
    // دریافت مقالات با صفحه‌بندی
    const articles = await Article.find({})
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    
    // دریافت تعداد کل مقالات
    const total = await Article.countDocuments({});
    
    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - ایجاد مقاله جدید (بدون تغییر)
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const article = await Article.create(body);
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}