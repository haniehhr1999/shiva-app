// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET: دریافت یک محصول خاص
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const product = await Product.findOne({ id: parseInt(id) });
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }

    // اضافه کردن فیلدهای مجازی به پاسخ
    const productObj = product.toObject();
    productObj.averageRating = product.getAverageRating();
    productObj.finalPrice = product.finalPrice;

    return NextResponse.json({ success: true, data: productObj });
  } catch (error) {
    console.error('Error in GET /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT: ویرایش کامل محصول
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const product = await Product.findOneAndUpdate(
      { id: parseInt(id) },
      body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error in PUT /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE: حذف محصول
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const product = await Product.findOneAndDelete({ id: parseInt(id) });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'محصول با موفقیت حذف شد' }
    );
  } catch (error) {
    console.error('Error in DELETE /api/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}