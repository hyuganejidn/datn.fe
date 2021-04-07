import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { UserAPI } from '@/services'
import * as typesHome from '@/modules/home/store/action_types'
import { LayoutBg, LayoutContainerCenter } from '@/_layouts'
import { makeGetSearchBlogs, makeGetSearchPostsWithType, makeGetSearchUsers } from './store/selector'

import Posts from './Posts'
import Blogs from '../blog/Blogs'
import PostsBlogs from '../blog/PostsBlogs'
import { SearchWrapper } from './Post.style'
import User from '../user/User'

function Search() {
  const location = useLocation()
  const { q } = queryString.parse(location.search)

  const dispatch = useDispatch()

  const blogs = makeGetSearchBlogs()
  const users = makeGetSearchUsers()
  const postsTopic = makeGetSearchPostsWithType('forum')
  const postsBlogs = makeGetSearchPostsWithType('blog')

  useEffect(() => {
    const fetchDataSearch = async () => {
      if (q.length > 0) {
        const data = await UserAPI.search(q)
        dispatch({ type: typesHome.SET_SEARCH, payload: data })
      }
    }

    fetchDataSearch()
  }, [q])

  return (
    <LayoutBg>
      <LayoutContainerCenter>
        {users.length > 0 && (
          <SearchWrapper>
            <h2>Mọi người</h2>
            {users.map(user => (
              <User user={user} key={user.id} />
            ))}
          </SearchWrapper>
        )}
        {postsTopic.length > 0 && (
          <SearchWrapper>
            <h2>Bài viết diễn đàn</h2>
            <Posts posts={postsTopic} />
          </SearchWrapper>
        )}
        {postsBlogs.length > 0 && (
          <SearchWrapper>
            <h2>Bài viết Blog</h2>
            <PostsBlogs posts={postsBlogs} view type="postSearch" />
          </SearchWrapper>
        )}
        {blogs.length > 0 && (
          <SearchWrapper>
            <h2>Blogs</h2>
            <Blogs blogs={blogs} />
          </SearchWrapper>
        )}
      </LayoutContainerCenter>
    </LayoutBg>
  )
}

export default Search
