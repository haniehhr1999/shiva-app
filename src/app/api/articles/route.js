import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const DB_PATH = path.join(process.cwd(), "db.json");

// Helper function to read the database
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { articles: [] };
  }
};

// Helper function to write to the database
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing to database:", error);
    return false;
  }
};

// GET all articles
export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.articles || []);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "در دریافت مقالات مشکلی پیش آمده است" },
      { status: 500 }
    );
  }
}

// POST new article
export async function POST(request) {
  try {
    // Get the JWT token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = readDB();

    // Check if user exists and is admin
    const user = db.users.find(u => u.id === decoded.userId);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "شما دسترسی لازم برای این عملیات را ندارید" },
        { status: 403 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { title, content, slug } = body;

    // Validate required fields
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "لطفا تمام فیلدهای ضروری را پر کنید" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    if (db.articles?.some(article => article.slug === slug)) {
      return NextResponse.json(
        { error: "این عنوان قبلا استفاده شده است" },
        { status: 400 }
      );
    }

    // Create new article
    const newArticle = {
      id: Date.now().toString(),
      title,
      content,
      slug,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update database
    if (!db.articles) {
      db.articles = [];
    }
    db.articles.push(newArticle);

    if (!writeDB(db)) {
      throw new Error("Failed to save article");
    }

    return NextResponse.json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "توکن نامعتبر است" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "در ایجاد مقاله مشکلی پیش آمده است" },
      { status: 500 }
    );
  }
} 