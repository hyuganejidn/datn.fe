import React from 'react'
import { makeGetMe } from '../auth/store/selector'

function Blog({ blog }) {
  const user = makeGetMe()

  const viewOptionBlog = () => {
    if (!user.blogsFollowing && blog.author?.id === user.id)
      return (
        <button type="button" onClick={() => 123}>
          Viết bài
        </button>
      )

    if (user.blogsFollowing.length > 0 && user.blogsFollowing.includes(blog.id)) {
      return (
        <button type="button" onClick={() => 123}>
          Đang theo dõi
        </button>
      )
    }
    return (
      <button type="button" onClick={() => 123}>
        Theo dõi
      </button>
    )
  }

  return (
    <li>
      <div className="flex items-center justify-between mt-8 ">
        <a className="min-w-0 flex items-center cursor-pointer no-underline" href="/blog/1234">
          <div className="flex-shrink-0">
            <img
              src={blog.avatar}
              className="h-12 w-12 rounded-sm"
              alt={blog.slug}
              style={{
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
          </div>
          <div className="min-w-0 ml-5">
            <div className="w-full font-medium text-xl text-black truncate">{blog.title}</div>
            <div className="text-sm font-light text-black overflow-hidden" style={{ maxHeight: '3em' }}>
              {blog.description}
            </div>
          </div>
        </a>
        <div>{viewOptionBlog()}</div>
      </div>
      <div className="h-px bg-gray-200 mt-5" />
      {/* <div>
        <div>
          <img src={blog.avatar} alt={blog.slug} />
        </div>
        <div>
          <div>{blog.title}</div>
          <div>{blog.description}</div>
        </div>
      </div> */}
    </li>
  )
}

export default Blog
