/* eslint consistent-return:0 import/order:0 */
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')
const express = require('express')
// const proxy = require('express-http-proxy')
const logger = require('./logger')
const cwd = process.cwd()
const argv = require('./argv')
const port = require('./port')
const setup = require('./middlewares/frontendMiddleware')
const {
  NODE_ENV,
  ENABLE_TUNNEL,
  HOST,
  // API_URL,
} = process.env
const isDev = NODE_ENV !== 'production'
const ngrok = (isDev && ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false
const { resolve, } = path
const app = express()

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi)
// app.use('/v1', proxy(API_URL, {
//   proxyReqPathResolver(req) {
//     return req.originalUrl
//   },
//   proxyReqOptDecorator(proxyReqOpts, originalReq) {
//     proxyReqOpts.rejectUnauthorized = false
//     return proxyReqOpts
//   },
// }))
// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(cwd, 'build'),
  publicPath: '/',
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip')
  next()
})

let server = null
if (!isDev) {
  server = http.createServer(app)
} else {
  const serverKey = path.join(cwd, 'certs', 'server.key')
  const serverCert = path.join(cwd, 'certs', 'server.crt')
  const config = {
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCert),
  }
  server = https.createServer(config, app)
}

// Start your app.
server.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message)
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url
    try {
      url = await ngrok.connect(port)
    } catch (e) {
      return logger.error(e)
    }
    logger.appStarted(port, prettyHost, url)
  } else {
    logger.appStarted(port, prettyHost)
  }
})
