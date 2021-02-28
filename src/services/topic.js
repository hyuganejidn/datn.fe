import http from '../axios'

const path = '/topics'

export const getPostsOfTopic = async topic => {
  const url = topic ? `${path}/${topic}/posts` : '/posts?classify=forum'
  return http.get(url).then(res => res.data)
}
