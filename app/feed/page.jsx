import Link from 'next/link';
import Post from '../components/Post';
import styles from '../page.module.css';
import prisma from '@/lib/prisma'



async function getPosts(){
  const posts = await prisma.post.findMany({
    where: {published: true},
    include: {
      author: {
        select: {username: true}
      }
    }
  })
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    
      <main className={styles.main}>
      
        <Link href={'/'}>Startseite</Link> <br></br>
        <Link href={'/login'}>Login</Link> <br></br>
        <Link href={'/add-post'}>Add Post</Link>
        <h1>Feed</h1>
        {
          posts.map((post) => {
            return (
              <Post
              key={post.id}
              id={post.id}
              username={post.author.username}
              title={post.title}
              content={post.content}
              />
            )
          })
        }
      </main>
    
  );
}
