'use client'
import Link from 'next/link';
import Post from '../components/Post';
import styles from '../page.module.css';
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
    <main className={styles.main}>
      <Link href={'/'}>Startseite</Link> <br />
      <Link href={'/login'}>Login</Link> <br />
      <Link href={'/add-post'}>Add Post</Link>
      <h1>Feed</h1>
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
    </main>
  );
}
