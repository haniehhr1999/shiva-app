import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "شناسه محصول الزامی است" },
        { status: 400 }
      );
    }

    // Read the database
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Find the user
    const userIndex = dbData.users.findIndex(u => u.id === decoded.id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    // Find the product
    const product = dbData.products.find(p => p.id === parseInt(productId));
    if (!product) {
      return NextResponse.json(
        { error: "محصول یافت نشد" },
        { status: 404 }
      );
    }

    // Check if product already exists in cart
    const existingPurchase = dbData.users[userIndex].purchases.find(
      p => p.productId === parseInt(productId)
    );

    if (existingPurchase) {
      // Update quantity if product exists
      existingPurchase.quantity += quantity;
    } else {
      // Add new purchase if product doesn't exist
      if (!dbData.users[userIndex].purchases) {
        dbData.users[userIndex].purchases = [];
      }
      dbData.users[userIndex].purchases.push({
        productId: parseInt(productId),
        quantity,
        title: product.title,
        price: product.price,
        img: product.img
      });
    }

    // Save updated data
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return NextResponse.json({
      message: "محصول با موفقیت به سبد خرید اضافه شد",
      purchases: dbData.users[userIndex].purchases
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "خطا در افزودن به سبد خرید" },
      { status: 500 }
    );
  }
} 