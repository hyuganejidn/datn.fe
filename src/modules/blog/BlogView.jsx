import { BlogAPI } from '@/services'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from 'Templates/commons/Modal'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import InfoUser from './components/InfoBlog'
import UserFollower from './components/UserFollower'
import StatusBlogView from './containers/StatusBlogView'
import PostsBlogs from './PostsBlogs'

function BlogView() {
  const { slug } = useParams()
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()

  const [blog, setBlog] = useState({})
  const [posts, setPosts] = useState([])
  const [isShowModalFollower, setIsShowModalFollower] = useState(false)
  const [isShowModalInfoUser, setIsShowModalInfoUser] = useState(false)
  const [usersFollowed, setUsersFollowed] = useState([])

  const isAuthorBlog = isAuth && blog.author?.id === user.id

  useEffect(() => {
    const fetchDataBlog = async () => {
      try {
        const blogData = await BlogAPI.getBlogById(slug)
        const postsData = await BlogAPI.getPostsOfBlogId(blogData.id)
        setPosts(postsData)
        setBlog(blogData)
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchDataBlog()
  }, [])

  const fetchUserFollowed = async () => {
    try {
      const usersFollowedRes = await BlogAPI.getUserFollowed(blog.id)
      setUsersFollowed(usersFollowedRes)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleShowFollower = () => {
    fetchUserFollowed()
    setIsShowModalFollower(prev => !prev)
  }

  const handleShowInfoUser = () => {
    setIsShowModalInfoUser(prev => !prev)
  }

  return (
    <div className="bg-white m-auto lg:max-w-2xl">
      <div>
        <div className="mt-3">
          <img src={blog.cover} alt={blog.slug} className="h-56 w-full object-cover" />
        </div>

        <div className="flex my-3 mx-2 md:mx-0">
          <img src={blog.avatar} alt={blog.title} className="w-16 h-16 rounded-sm mt-3 flex-shrink-0 object-cover" />
          <div className="ml-4 break-words min-w-0">
            <div className="font-medium text-2xl">{blog.title}</div>
            <div className="font-light">{blog.description}</div>
            <Link className="flex mt-1 items-center no-underline" to={`/users/${blog.author?.id}`}>
              <img src={blog.author?.avatar} alt={blog.title} className="rounded-full w-6 h-6" />
              <span className="text-gray-800 mr-3 text-sm ml-1 hover:underline">{blog.author?.fullName}</span>
            </Link>
          </div>
        </div>
        <div className="h-px bg-gray-300 mt-1" />
        <div className="flex items-center my-1 mx-2 md:mx-0 ">
          {isAuthorBlog ? (
            <>
              <Link
                className="hover:bg-green-500 text-sm bg-green-600 px-3 py-1 rounded cursor-pointer text-white font-light mr-3 no-underline"
                to={`/posts/add?classify=blog&blogSlug=${blog.slug}`}
              >
                Viết bài
              </Link>
              <div className="flex items-center text-sm mr-2">
                <div className="font-light cursor-pointer hover:bg-gray-200 rounded p-1">Chỉnh sửa</div>
              </div>
            </>
          ) : (
            <StatusBlogView blogId={blog?.id} authorId={blog?.author?.id} />
          )}
          <div
            className="font-light text-sm mr-2 cursor-pointer rounded hover:bg-gray-200 p-1 ml-2"
            onClick={handleShowInfoUser}
            aria-hidden="true"
          >
            Thông tin
          </div>
          <div
            className="font-light text-sm cursor-pointer rounded hover:bg-gray-200 p-1"
            onClick={handleShowFollower}
            aria-hidden="true"
          >
            {blog.followNum} người theo dõi
          </div>
        </div>
        <div className="h-px bg-gray-300 mb-3" />
      </div>
      {isShowModalFollower && (
        <Modal
          title="Lượt theo dõi"
          setIsShowModal={setIsShowModalFollower}
          component={UserFollower}
          users={usersFollowed}
        />
      )}

      {isShowModalInfoUser && (
        <Modal title="Thông tin blog" setIsShowModal={setIsShowModalInfoUser} component={InfoUser} blog={blog} />
      )}

      <div>
        <PostsBlogs posts={posts} />
      </div>
    </div>
  )
}

export default BlogView
