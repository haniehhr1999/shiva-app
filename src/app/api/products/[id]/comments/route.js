import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export async function POST(request, { params }) {
  try {
    // Get user info from token
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

    // Get comment data from request
    const { text, rating } = await request.json();

    if (!text || !rating) {
      return NextResponse.json(
        { error: "لطفا متن نظر و امتیاز را وارد کنید" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "امتیاز باید بین 1 تا 5 باشد" },
        { status: 400 }
      );
    }

    // Read current db.json
    const dbPath = path.join(process.cwd(), "db.json");
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    // Find the product
    const productIndex = dbData.products.findIndex(
      (p) => p.id === parseInt(params.id)
    );

    if (productIndex === -1) {
      return NextResponse.json(
        { error: "محصول یافت نشد" },
        { status: 404 }
      );
    }

    // Check if user has already commented on this product
    const existingComment = dbData.products[productIndex].comments?.find(
      (c) => c.userId === decoded.id
    );

    if (existingComment) {
      return NextResponse.json(
        { error: "شما قبلا برای این محصول نظر ثبت کرده‌اید" },
        { status: 400 }
      );
    }

    // Create new comment
    const newComment = {
      id: Date.now(),
      userId: decoded.id,
      username: decoded.username,
      text,
      rating,
      createdAt: new Date().toISOString(),
    };

    // Add comment to product
    if (!dbData.products[productIndex].comments) {
      dbData.products[productIndex].comments = [];
    }
    dbData.products[productIndex].comments.push(newComment);

    // Save updated data
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "خطا در ثبت نظر" },
      { status: 500 }
    );
  }
} 