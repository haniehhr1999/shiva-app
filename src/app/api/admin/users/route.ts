// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth"; // your token verify helper
import { db } from "@/lib/db"; // your DB helper

export async function PATCH(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !(await verifyAdmin(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, isBanned, newUsername, newPassword } = await req.json();

  // validate inputs...

  // Update user
  if (isBanned !== undefined) {
    await db.user.update({ where: { id: userId }, data: { isBanned } });
  }
  if (newUsername || newPassword) {
    // hash new password if present, then update
    let data: any = {};
    if (newUsername) data.username = newUsername;
    if (newPassword) data.passwordHash = hashPassword(newPassword);
    await db.user.update({ where: { id: userId }, data });
  }

  return NextResponse.json({ success: true });
}
