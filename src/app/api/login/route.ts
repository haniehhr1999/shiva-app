import { NextRequest, NextResponse } from 'next/server';
import { signJwt } from '../../../../lib/jwt';
import { serialize } from 'cookie';

const users = [
  { id: '1', username: 'user1', password: 'pass1' },
  { id: '2', username: 'user2', password: 'pass2' },
];

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await signJwt({ sub: user.id, username: user.username });

  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.json({ message: 'Logged in' }, {
    status: 200,
    headers: {
      'Set-Cookie': cookie,
    }
  });
}
