import http from '../helpers/axios'

const path = '/users'

export const listUser = () => http.get(`${path}`).then(res => res.data)

export const me = () => http.get(`${path}/me`)

export const resetPassword = () => http.get(`${path}/me/reset_password`)

export const show = id => http.get(`${path}/${id}`)

export const posts = id => http.get(`${path}/${id}/posts?sort=-createdAt`)

export const followBlog = blogId => http.post(`${path}/follow_blog`, { blogId })
