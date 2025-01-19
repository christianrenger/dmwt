'use client'
import Link from 'next/link';
import './page.css';
import { useState } from 'react';


export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to post.');
      return;
    }

    try {
      const res = await fetch('/api/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        window.location.href = '/add-post'
      } else {
        setError('Post failed');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }

    setTitle('');
    setContent('');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logoo.svg" alt="Revivo Logo" className="logo-icon" />
          <span>Revivo</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/feed">Community-Feed</Link></li>
          <li><a href="#startseite">Startseite</a></li>
          <li><a href="#infografik">Infografik</a></li>
          <li><a href="#unsere-wahl">Unsere Wahl</a></li>
        </ul>
      </nav>
  
      <div className="logincontainer">
        <div className="form-wrapper">
          <h1>Add Post</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                value={content}
                onChange={handleContentChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
  
}