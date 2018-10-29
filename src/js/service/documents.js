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

function getMany(json) {
  return fetch('api/documents', {
    method: 'get',
    json,
  })
}

function create(json) {
  return fetch('api/documents', {
    json,
  })
}
