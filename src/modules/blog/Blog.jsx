import React from 'react'
import { makeGetMe } from '../auth/store/selector'

function Blog({ blog }) {
  const user = makeGetMe()

  const viewOptionBlog = () => {
    if (user.blogsFollowing.length > 0) {
      user.blogsFollowing.include(blog.id) ? (
        <button type="button" onClick={() => 123}>
          Đang theo dõi
        </button>
      ) : (
        <button type="button" onClick={() => 123}>
          Theo dõi
        </button>
      )
    } else {
      blog.author?.id === user.id && (
        <button type="button" onClick={() => 123}>
          Viết bài
        </button>
      )
    }
  }

  return (
    <li>
      <div>
        <div>
          <img src={blog.avatar} alt={blog.slug} />
        </div>
        <div>
          <div>{blog.title}</div>
          <div>{blog.description}</div>
        </div>
      </div>

      <div>{viewOptionBlog()}</div>
    </li>
  )
}

export default Blog
