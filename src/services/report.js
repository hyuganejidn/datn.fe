import http from '../helpers/axios'

const path = '/reports'

export const index = () => http.get(`${path}`).then(res => res.data)

export const destroy = id => http.delete(`${path}/${id}`)

export const show = id => http.get(`${path}/${id}`)
