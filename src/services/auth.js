import http from '../helpers/axios'

const path = '/auth'

export const login = ({ username, password }) =>
  http.post(`${path}/login`, { username, password })

export const register = () => http.post(`${path}/register`)
