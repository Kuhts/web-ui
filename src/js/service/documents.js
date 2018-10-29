import {
  fetch,
} from 'js/utils'
const documents = {
  getMany,
  create,
}

export {
  documents,
}

function getMany(body) {
  return fetch('api/documents', {
    method: 'get',
    body,
  })
}

function create(json) {
  return fetch('api/documents', {
    json,
  })
}
