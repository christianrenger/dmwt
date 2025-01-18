// app/api/user/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Access denied' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}