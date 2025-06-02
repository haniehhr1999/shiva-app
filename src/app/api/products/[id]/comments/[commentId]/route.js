import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(request, { params }) {
  try {
    const { id, commentId } = params;
    const dbPath = path.join(process.cwd(), "db.json");
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    // پیدا کردن محصول مورد نظر
    const productIndex = dbData.products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
      return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    }

    // پیدا کردن نظر مورد نظر
    const commentIndex = dbData.products[productIndex].comments.findIndex(
      c => c.id === parseInt(commentId)
    );
    if (commentIndex === -1) {
      return NextResponse.json({ error: "نظر یافت نشد" }, { status: 404 });
    }

    // حذف نظر
    dbData.products[productIndex].comments.splice(commentIndex, 1);

    // ذخیره تغییرات در فایل
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return NextResponse.json({ message: "نظر با موفقیت حذف شد" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "خطا در حذف نظر" },
      { status: 500 }
    );
  }
} 