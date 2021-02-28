import http from '../axios'

const path = '/posts'

export const getPost = () => http.get(path).then(res => res.data)
