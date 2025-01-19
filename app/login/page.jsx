'use client'
import { useState } from 'react';

import './page.css';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        console.log('Stored Token:', localStorage.getItem('token'))
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
    <nav className="navbar">
     
        <div className="logo">
        <Link href="/">
        <img src="/logoo.svg" alt="Revivo Logo" className="logo-icon" />
        </Link>
        <span>Revivo</span>
      </div>
     

     <ul className="nav-links">
       <li><Link href="/feed">Community-Feed</Link></li>
       <li><a href="/#infografik">Infografik</a></li>
       <li><a href="/#unsere-wahl">Unsere Wahl</a></li>
       <li><Link href="/login">Login</Link></li>
     </ul>
    </nav>
  

            
    <div className="logincontainer">
      <div className="form-wrapper">
      
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username eingeben"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Passwort eingeben"
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>

      <div className="form-wrapper">
        <h2>Registrieren</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="new-username">Username:</label>
            <input
              type="text"
              id="new-username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              placeholder="Wähle einen Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Passwort:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Wähle ein Passwort"
            />
          </div>
          <button type="submit" className="btn">Registrieren</button>
        </form>
      </div>
    </div>
    </div>
  );
}