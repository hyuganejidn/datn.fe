import React from 'react'
import Blog from './Blog'

function Blogs({ blogs }) {
  return (
    <ul>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  )
}

export default Blogs
