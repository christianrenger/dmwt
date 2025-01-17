import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (user && await bcrypt.compare(password, user.password)) {
      return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 })
    } else {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 })
  }
}
  