// app/api/products/[id]/comments/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// POST: افزودن کامنت جدید به محصول
export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const product = await Product.findOne({ id: parseInt(id) });
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }

    // ایجاد کامنت جدید با ID یکتا
    const newComment = {
      id: Date.now(),
      userId: body.userId,
      username: body.username,
      text: body.text,
      rating: body.rating,
      createdAt: new Date(),
      createdAtJalali: body.createdAtJalali || new Date().toLocaleDateString('fa-IR')
    };

    product.comments.push(newComment);
    await product.save();

    return NextResponse.json(
      { success: true, data: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/products/[id]/comments:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}