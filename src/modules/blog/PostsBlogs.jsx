import React from 'react'
import { makeGetMe } from '../auth/store/selector'
import PostBlog from './PostBlog'

function PostsBlogs({ posts }) {
  const user = makeGetMe()
  return (
    <ul>
      {posts.map(post => (
        <PostBlog key={post.id} post={post} userId={user} />
      ))}
    </ul>
  )
}

export default PostsBlogs
