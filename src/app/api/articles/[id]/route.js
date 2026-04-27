import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

// GET - دریافت یک مقاله با ID مشخص
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const article = await Article.findById(id);
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'مقاله یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - ویرایش کامل یک مقاله
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    
    const article = await Article.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'مقاله یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH - ویرایش جزئی یک مقاله
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    
    const article = await Article.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'مقاله یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - حذف یک مقاله
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const article = await Article.findByIdAndDelete(id);
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'مقاله یافت نشد' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'مقاله با موفقیت حذف شد' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}