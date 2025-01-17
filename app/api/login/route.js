import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET_KEY = process.env.SECRET_KEY

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
      // Generate JWT
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' })
      console.log('Generated Token:', token) // Log the token to check
      return new Response(JSON.stringify({ message: 'Login successful', token }), { status: 200 })
    } else {
      return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 })
  }
}
  