import React from 'react'
import { Link } from 'react-router-dom'
import StatusBlog from '@/modules/blog/containers/StatusBlog'

function Blog({ blog }) {
  return (
    <li>
      <div className="flex items-center justify-between mt-8 ">
        <Link className="min-w-0 flex items-center cursor-pointer no-underline" to={`/blogs/${blog.slug}`}>
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
        </Link>
        <div>
          <StatusBlog blogId={blog.id} blogAuthorId={blog.author?.id} blogSlug={blog.slug} />
        </div>
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
