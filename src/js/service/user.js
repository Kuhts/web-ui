import { fetch, } from 'js/utils'
import { UIPath, } from 'js/utils/url'

const base = `${UIPath}profile/`
const urls = {
  profile: () => base,
  publicProfile: (id) => [base, id].join('/'),
}
const user = {
  urls,
  check,
  logout,
  detachProvider,
  update,
  auth,
  getByPath,
}

export {
  user,
}

function getByPath(json) {
  return fetch('api/user/', {
    method: 'get',
    json,
  })
}

function auth(provider) {
  return fetch(`auth/${provider}/`)
}

function update(json) {
  return fetch('api/user', {
    method: 'put',
    json,
  })
}

function check() {
  return fetch('auth/check', {
    method: 'get',
    headers: {
      'X-Trigger': 'CORS',
    },
  })
}

function logout() {
  return fetch('auth/logout', {
    method: 'get',
  })
}

function detachProvider(key) {
  return fetch(`auth/${key}/detach`, {
    method: 'get',
  })
}
