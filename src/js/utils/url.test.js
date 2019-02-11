import {
  API_URL,
} from 'config'
import {
  stringify,
} from 'querystring'
import {
  url,
  path,
  query,
} from './url'

const params = {
  pocket: 'keys',
  hand: 'pen',
}

const sub = 'profile/edit/password'
test('generate url from a string', () => {
  expect(url(sub)).toEqual(`${API_URL}v1/${sub}`)
})

test('generate url from a string with query params', () => {
  expect(url(sub, params)).toEqual(`${API_URL}v1/${sub}?${stringify(params)}`)
})

test('a path can be created manually', () => {
  expect(path(sub, params)).toEqual(`${sub}?${stringify(params)}`)
})

test('a path can be created manually without path', () => {
  expect(path(undefined, params)).toEqual(`?${stringify(params)}`)
})

test('serializes a query', () => {
  expect(query({})).toBe('')
})

test('serializes a query with actual data', () => {
  expect(query(params)).toBe(`?${stringify(params)}`)
})
