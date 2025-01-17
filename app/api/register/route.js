import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
    return new Response(JSON.stringify({ message: 'User created', user }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'User creation failed' }), { status: 500 })
  }
}

