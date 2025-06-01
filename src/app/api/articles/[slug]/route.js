import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const filePath = path.join(process.cwd(), "db.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    
    const article = data.articles.find(article => article.slug === slug);
    
    if (!article) {
      return NextResponse.json(
        { error: "مقاله یافت نشد" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت مقاله" },
      { status: 500 }
    );
  }
} 