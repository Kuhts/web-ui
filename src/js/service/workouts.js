import { fetch, } from 'js/utils'
import { UIPath, } from 'js/utils/url'

const base = `${UIPath}workouts`
const urls = {
  create: () => `${base}/create`,
  edit: (id) => `${base}/${id}/edit`,
  view: (id) => `${base}/${id}/`,
}
const workouts = {
  getMany,
  create,
  get,
  write,
  urls,
}

export {
  workouts,
}

function write(id, json) {
  return fetch(`api/workouts/${id}`, {
    method: 'put',
    json,
  })
}

function get(id) {
  return fetch(`api/workouts/${id}`, {
    method: 'get',
  })
}

function getMany(json) {
  return fetch('api/workouts', {
    method: 'get',
    json,
  })
}

function create(json) {
  return fetch('api/workouts', {
    json,
  })
}
