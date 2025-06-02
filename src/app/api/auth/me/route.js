import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

// Helper function to read the database
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [] };
  }
};

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'لطفا وارد حساب کاربری خود شوید' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const db = readDB();
    const user = db.users.find(u => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    console.error('Error in GET /api/auth/me:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت اطلاعات کاربر' },
      { status: 500 }
    );
  }
} 