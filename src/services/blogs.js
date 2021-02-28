import http from '../axios'

const path = '/blogs'

export const getPostsOfBlogId = () => http.get(path).then(res => res.data)
