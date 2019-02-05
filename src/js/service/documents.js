import {
  fetch,
} from 'js/utils'
const documents = {
  getMany,
  create,
  get,
  write,
}

export {
  documents,
}

function write(id, json) {
  return fetch(`api/documents/${id}/write`, {
    method: 'put',
    json,
  })
}

function getMany(json) {
  return fetch('api/documents', {
    method: 'get',
    json,
  })
}

function get(select) {
  return fetch(`api/documents/${select.id}`, {
    method: 'get',
  })
}

function create(json) {
  return fetch('api/documents', {
    json,
  })
}
