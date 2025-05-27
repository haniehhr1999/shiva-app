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
        { error: "توکن یافت نشد" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const { productId, quantity } = await request.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { error: "اطلاعات ناقص است" },
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

    // Find the product in user's purchases
    const purchaseIndex = dbData.users[userIndex].purchases.findIndex(
      p => p.productId === productId
    );

    if (purchaseIndex === -1) {
      return NextResponse.json(
        { error: "محصول در سبد خرید یافت نشد" },
        { status: 404 }
      );
    }

    // Update quantity
    if (quantity <= 0) {
      // Remove product if quantity is 0 or negative
      dbData.users[userIndex].purchases.splice(purchaseIndex, 1);
    } else {
      dbData.users[userIndex].purchases[purchaseIndex].quantity = quantity;
    }

    // Save updated data
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return NextResponse.json({
      message: "سبد خرید با موفقیت به‌روزرسانی شد",
      purchases: dbData.users[userIndex].purchases
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "خطا در به‌روزرسانی سبد خرید" },
      { status: 500 }
    );
  }
} 