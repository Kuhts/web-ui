// import 'react-dates/initialize'
import '@babel/polyfill'
import {
  App,
  LanguageProvider,
} from 'js/component'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, } from 'unstated'
import { Router, } from 'react-router-dom'
import history from 'js/history'
import 'scss/index.scss'
// import socket from 'js/socket'
import {
  translationMessages,
} from './i18n'
// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
import 'file-loader?name=.htaccess!./.htaccess' // eslint-disable-line import/extensions


const MOUNT_NODE = document.getElementById('app')

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept([
    './i18n',
    'js/component/App'
  ], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'))
  })
    .then(() => Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js')
    ])) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err
    })
} else {
  render(translationMessages)
}

function render(messages) {
  return ReactDOM.render(tree(messages), MOUNT_NODE)
}

function tree(messages) {
  return (
    <Provider>
      <LanguageProvider messages={messages}>
        <Router history={history}>
          <App />
        </Router>
      </LanguageProvider>
    </Provider>
  )
}
