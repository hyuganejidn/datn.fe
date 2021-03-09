import React from 'react'
import PostBlog from './PostBlog'

function PostsBlogs({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <PostBlog key={post.id} post={post} />
      ))}
    </ul>
  )
}

export default PostsBlogs
