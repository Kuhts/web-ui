import { fetch, } from 'js/utils'
import { UIPath, } from 'js/utils/url'

const base = `${UIPath}movement`
const urls = {
  create: () => `${base}/create`,
  edit: (id) => `${base}/${id}/edit`,
  view: (id) => `${base}/${id}/`,
}
const movements = {
  getAll,
  create,
  write,
  urls,
  get,
}

export {
  movements,
}

function write(id, json) {
  return fetch(`api/movement/${id}`, {
    method: 'put',
    json,
  })
}

function get(id) {
  return fetch(`api/movement/${id}`, {
    method: 'get',
  })
}

function getAll(json) {
  return fetch('api/movement', {
    method: 'get',
    json,
  })
}

function create(json) {
  return fetch('api/movement', {
    json,
  })
}
