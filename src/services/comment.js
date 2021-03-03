import http from '../helpers/axios'

const path = '/comments'

export const voteComment = (id, vote) =>
  http.put(`${path}/${id}/vote`, { vote })
