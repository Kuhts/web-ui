import { stringify, } from 'querystring'
import { API_URL, } from 'config'

export const UIPath = '/app/'
export const url = (pathname, params) => `${API_URL}v1/${path(pathname, params)}`

export const path = (path = '', params = {}) => `${path}${query(params)}`

export const query = (params) => {
  const string = stringify(params)
  return string ? `?${string}` : string
}
