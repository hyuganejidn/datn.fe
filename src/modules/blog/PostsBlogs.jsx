import React from 'react'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import PostBlog from './PostBlog'

function PostsBlogs({ posts, type }) {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()
  return (
    <ul>
      {posts.map(post => (
        <PostBlog key={post.id} post={post} userId={user.id} type={type} isAuth={isAuth} />
      ))}
    </ul>
  )
}

export default PostsBlogs
