import http from '../helpers/axios'

const path = '/posts'

export const getPost = () => http.get(path).then(res => res.data)

export const votePost = (id, vote) => http.put(`${path}/${id}/vote`, { vote })

export const getPostsUserVoted = () => http.get(`/users/posts_vote?type=forum`)
