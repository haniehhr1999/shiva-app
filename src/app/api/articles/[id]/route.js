import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const dbPath = path.join(process.cwd(), 'db.json');

// Helper function to read the database
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { articles: [] };
  }
};

// Helper function to write to the database
const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
};

// GET /api/articles/[id]
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const db = readDB();
    const article = db.articles.find(a => a.id === parseInt(id));

    if (!article) {
      return NextResponse.json(
        { error: 'مقاله مورد نظر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error in GET /api/articles/[id]:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت مقاله' },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[id]
export async function PUT(request, { params }) {
  try {
    // Check if user is admin
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'لطفا وارد حساب کاربری خود شوید' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const db = readDB();
    const user = db.users.find(u => u.id === decoded.userId);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'شما دسترسی لازم برای این عملیات را ندارید' },
        { status: 403 }
      );
    }

    const { id } = params;
    const article = db.articles.find(a => a.id === parseInt(id));

    if (!article) {
      return NextResponse.json(
        { error: 'مقاله مورد نظر یافت نشد' },
        { status: 404 }
      );
    }

    // Validate request body
    const body = await request.json();
    const { title, content, slug } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'لطفا تمام فیلدهای ضروری را وارد کنید' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    if (db.articles.some(a => a.slug === slug && a.id !== parseInt(id))) {
      return NextResponse.json(
        { error: 'مقاله‌ای با این عنوان قبلا ایجاد شده است' },
        { status: 400 }
      );
    }

    // Update article
    article.title = title;
    article.content = content;
    article.slug = slug;
    article.updatedAt = new Date().toISOString();

    if (!writeDB(db)) {
      return NextResponse.json(
        { error: 'خطا در بروزرسانی مقاله' },
        { status: 500 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error in PUT /api/articles/[id]:', error);
    return NextResponse.json(
      { error: 'خطا در بروزرسانی مقاله' },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id]
export async function DELETE(request, { params }) {
  try {
    // Check if user is admin
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'لطفا وارد حساب کاربری خود شوید' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const db = readDB();
    const user = db.users.find(u => u.id === decoded.userId);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'شما دسترسی لازم برای این عملیات را ندارید' },
        { status: 403 }
      );
    }

    const { id } = params;
    const articleIndex = db.articles.findIndex(a => a.id === parseInt(id));

    if (articleIndex === -1) {
      return NextResponse.json(
        { error: 'مقاله مورد نظر یافت نشد' },
        { status: 404 }
      );
    }

    // Remove article
    db.articles.splice(articleIndex, 1);

    if (!writeDB(db)) {
      return NextResponse.json(
        { error: 'خطا در حذف مقاله' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'مقاله با موفقیت حذف شد' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/articles/[id]:', error);
    return NextResponse.json(
      { error: 'خطا در حذف مقاله' },
      { status: 500 }
    );
  }
} 