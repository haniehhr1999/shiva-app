import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // استخراج تمام نظرات از محصولات
    const allReviews = data.products.flatMap((product: any) => 
      product.comments.map((comment: any) => ({
        id: comment.id,
        productId: product.id,
        productTitle: product.title,
        userId: comment.userId,
        username: comment.username,
        text: comment.text,
        rating: comment.rating,
        createdAt: comment.createdAt,
        createdAtJalali: comment.createdAtJalali
      }))
    );

    // مرتب‌سازی نظرات بر اساس تاریخ (جدیدترین اول)
    const sortedReviews = allReviews.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // انتخاب 6 نظر آخر
    const latestReviews = sortedReviews.slice(0, 6);

    return NextResponse.json(latestReviews);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return NextResponse.json({ error: 'Error reading reviews' }, { status: 500 });
  }
} 