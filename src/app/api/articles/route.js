// app/api/articles/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    let filter = { isPublished: true };
    if (category) filter.category = category;

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Article.countDocuments(filter)
    ]);

    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in GET /api/articles:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const lastArticle = await Article.findOne().sort({ id: -1 });
    const newId = lastArticle ? lastArticle.id + 1 : 1;

    const article = await Article.create({
      ...body,
      id: newId,
      views: 0,
      isPublished: true
    });

    return NextResponse.json(
      { success: true, data: article },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/articles:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}