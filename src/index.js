// import 'react-dates/initialize'
import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import {
  App,
  // LanguageProvider,
} from 'js/component'
import { Provider, } from 'unstated'
import { Router, } from 'react-router-dom'
import history from 'js/history'
import 'scss/index.scss'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
// import {
//   translationMessages,
// } from './i18n'
// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
import 'file-loader?name=.htaccess!./.htaccess' // eslint-disable-line import/extensions
const translationMessages = {}
OfflinePluginRuntime.install()

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

const render = (messages) => ReactDOM.render(tree(messages), MOUNT_NODE)

// <LanguageProvider messages={messages}>
// </LanguageProvider>
const tree = (messages) => (
  <Provider>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

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
