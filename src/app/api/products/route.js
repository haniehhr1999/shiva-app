import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "db.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data.products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json(
      { error: "Error reading products" },
      { status: 500 }
    );
  }
}