import http from '../helpers/axios'

const path = '/blogs'

export const getPostsOfBlogId = id =>
  http.get(`${path}/${id}/posts`).then(res => res.data)

export const getBlogById = slug => http.get(`${path}/${slug}`)

export const getPostsOfBLogs = () =>
  http.get('/posts?classify=blog').then(res => res.data)

export const getBlogs = () => http.get(`${path}`).then(res => res.data)

export const getBlogsUserFollowed = () =>
  http.get(`${path}/users_followed`).then(res => res.data)

export const getPostsUserFollowed = () =>
  http.get(`posts/blogs_followed`).then(res => res.data)

export const getBlogsMe = () => http.get(`users/me/blogs`).then(res => res.data)
