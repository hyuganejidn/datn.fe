import { BlogAPI } from '@/services'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostsBlogs from './PostsBlogs'

function BlogView() {
  const { slug } = useParams()
  const [blog, setBlog] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchDataBlog = async () => {
      try {
        const blogData = await BlogAPI.getBlogById(slug)
        const postsData = await BlogAPI.getPostsOfBlogId(blogData.id)
        console.log(blogData)
        setPosts(postsData)
        setBlog(blogData)
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchDataBlog()
  }, [])

  return (
    <div>
      <div>
        <img src={blog.cover} alt={blog.slug} />
      </div>
      <div>
        <img src={blog.avatar} alt={blog.title} />
        <div>
          <h2>{blog.title}</h2>
          <h4>{blog.description}</h4>
          <article>
            <img src={blog.author?.avatar} alt={blog.title} />
            <span>{blog.author?.fullName}</span>
          </article>
        </div>
      </div>
      <div>
        <button type="button" onClick={() => 123}>
          Follow
        </button>
        <button type="button" onClick={() => 123}>
          Thông tin
        </button>
        <button type="button" onClick={() => 123}>
          {blog.followNum} Người theo dõi
        </button>
      </div>
      <div>
        <PostsBlogs posts={posts} />
      </div>
      <div />
    </div>
  )
}

export default BlogView
