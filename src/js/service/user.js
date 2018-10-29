import {
  fetch,
} from 'js/utils'

const user = {
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
