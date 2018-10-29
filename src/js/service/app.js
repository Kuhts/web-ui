import { fetch, } from 'js/utils'

const app = {
  wake,
}

export { app, }

function wake() {
  return fetch('wake-up', {
    method: 'GET',
  })
}
