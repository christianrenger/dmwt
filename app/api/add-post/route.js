import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Access denied' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { title, content } = await request.json();

    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: true,
        authorId: decoded.userId, // Assuming userId is stored in the token
        
      }, 
      include: {
        author: true, 
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Post creation error:', error);
    return NextResponse.json({ error: 'Post creation failed' }, { status: 500 });
  }
}