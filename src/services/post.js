import http from '../helpers/axios'

const path = '/posts'

export const list = () => http.get(path).then(res => res.data)

export const getPostById = id => http.get(`${path}/${id}`).then(res => res)

export const votePost = (id, vote) => http.put(`${path}/${id}/vote`, { vote })

export const getPostsUserVoted = () => http.get(`/users/posts_vote?type=forum`)

export const listComment = id =>
  http.get(`${path}/${id}/comments`).then(res => res.data)
