import React, { useEffect, useState } from 'react'

import { getPostsOfTopic } from '@/services/topic'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsOfForum = await getPostsOfTopic()
        setPosts([...postsOfForum])
      } catch (error) {
        throw new Error('')
      }
    }
    getPosts()
  }, [])

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => <Post key={post.id} post={post} />)
      ) : (
        <div>not data</div>
      )}
    </div>
  )
}

export default Posts
