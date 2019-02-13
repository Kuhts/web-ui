import fetch from 'isomorphic-fetch'
import { isString, omit, } from 'lodash'
import { url as fullUrl, } from 'js/utils/url'

export { request as fetch, }

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON({ method, }) {
  return (response) => {
    if (response.status === 204 || response.status === 205) {
      return null
    }
    if (method === 'DELETE') {
      return null
    }
    const { headers, } = response
    const contentType = headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') >= 0) {
      return response.json()
    }
    return response.text()
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

function request(uri, options_ = {}) {
  const {
    body,
    json,
    headers,
    method = 'POST',
  } = options_
  const _method = method.toUpperCase()
  const isGET = _method === 'GET'
  const headersExtension = isGET ? {
    ...headers,
  } : {
    'Content-Type': 'application/json',
    ...headers,
  }
  const jsonExtension = !isGET && json ? {
    body: JSON.stringify(json),
    headers: headersExtension,
  } : {
    headers: headersExtension,
  }
  const bodyExtension = body ? {
    body,
  } : {}
  const options = {
    // mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers,
    ...omit(options_, ['json']),
    ...jsonExtension,
    ...bodyExtension,
  }
  const query = isGET ? json : null
  const url = fullUrl(uri, query)
  return fetch(url, options)
    .then(parseJSON(options))
    .then(checkErrorCodes(uri))
}

function checkErrorCodes(url) {
  return (result) => {
    if (!result || (!result.error && !result.errors)) {
      return result
    }
    const error = result.error
    if (isString(error)) {
      result.url = url
      throw [result]
    }
    let errors = result.errors || []
    if (error) {
      errors = errors.concat(error)
    }
    errors.forEach((error) => {
      error.url = url
    })
    throw errors
  }
}
