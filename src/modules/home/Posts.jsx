import React, { useEffect, useState } from 'react'

import { getPostsOfTopic } from '@/services/topic'
import { useParams } from 'react-router-dom'
import { getPostsUserVoted } from '@/services/post'
import Post from './Post'

function Posts() {
  const [posts, setPosts] = useState([])
  const [postsVote, setPostsVote] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { slug } = useParams()
  const getPosts = async () => {
    try {
      const postsOfForum = await getPostsOfTopic(slug)
      setPosts([...postsOfForum])
    } catch (error) {
      throw new Error(error)
    }
  }

  const getPostsVoted = async () => {
    try {
      const postsUserVoted = await getPostsUserVoted()
      setPostsVote({ ...postsUserVoted })
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    getPosts()
    getPostsVoted()
  }, [slug])

  return (
    <div>
      {!isLoading && posts.length > 0 ? (
        posts.map(post => (
          <Post key={post.id} post={post} isVote={postsVote[post.id]} />
        ))
      ) : (
        <div>not data</div>
      )}
    </div>
  )
}

export default Posts
