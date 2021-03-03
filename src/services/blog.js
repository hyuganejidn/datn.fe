import http from '../helpers/axios'

const path = '/blogs'

export const getPostsOfBlogId = () => http.get(path).then(res => res.data)

export const getBlogById = slug => http.get(`${path}/${slug}`)
