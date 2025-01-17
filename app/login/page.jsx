'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        window.location.href = '/add-post'
      } else {
        setError('Login failed')
      }
    } catch (error) {
      console.error(error)
      setError('An error occurred')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      })
      if (res.ok) {
        alert('Registration successful')
      } else {
        setError('Registration failed')
      }
    } catch (error) {
      console.error(error)
      setError('An error occurred')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
      </form>

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="new-username">Username:</label><br />
        <input type="text" id="new-username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required /><br />
        <label htmlFor="new-password">Password:</label><br />
        <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}