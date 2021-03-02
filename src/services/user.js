import http from '../helpers/axios'

const path = '/users'

export const listUser = () => http.get(`${path}`).then(res => res.data)

export const me = () => http.get(`${path}/me`)

export const resetPassword = () => http.get(`${path}/me/reset_password`)

export const show = id => http.get(`${path}/${id}`)

export const followBlog = blogId => http.get(`${path}/follow_blog`, { blogId })
