'use client'
import Link from 'next/link';
import Post from '../components/Post';
import './page.css'
import { useState, useEffect } from 'react';

async function fetchUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const res = await fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    } else {
      console.error('Failed to fetch user');
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

async function fetchPosts() {
  const res = await fetch('/api/test');
  if (res.ok) {
    const data = await res.json();
    return data.posts;
  } else {
    console.error('Failed to fetch posts');
    return [];
  }
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);

      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    fetchData();
  }, []);

  return (

    <div>
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
    <main className="logincontainer">
      {/* Navigation Links */}
      
  
      {/* Feed Section */}
      <div className="form-wrapper">
        <div className="feedheader">
        <h1>Community-Feed</h1>
        <Link href="/add-post"><button>Poste etwas</button></Link>
        </div>

        {!user && (
    <div className="loginaufforderung">
      <Link href="/login"><button>Login</button></Link> um Posts zu schreiben oder zu löschen.
    </div>
  )}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            username={post.author.username}
            loggedInUsername={user?.username}
          />
        ))}
      </div>
    </main>
    </div>
  );
  
}
