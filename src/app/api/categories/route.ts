import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "db.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    const uniqueCategories = [
      ...new Set(data.products.map((item) => item.category)),
    ];

    const categoryArray = uniqueCategories.map((category) => ({
      name: category,
      id: category,
      image: `/images/${category}1.jpg`,
    }));

    return NextResponse.json(categoryArray);
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json(
      { error: "Error reading categories" },
      { status: 500 },
    );
  }
}
