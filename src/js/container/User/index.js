import React from 'react'
import { fromJS, } from 'immutable'
import { Container, Subscribe, Provider, } from 'unstated'
import { apiurl, } from 'js/utils'
import { PROVIDERS, } from 'config'
import { isUndefined, assign, } from 'lodash'
import { user, } from 'js/service'
import {
  array,
  any,
} from 'prop-types'

const providers = fromJS(PROVIDERS)

export class UserContainer extends Container {
  constructor(props) {
    super(props)
    const state = assign({
      data: fromJS({}),
      providers,
      loading: true,
    }, props)
    this.state = state
  }

  load(pathname) {
    return (this.publicProfile = this.publicProfile
      || this.setState(({
        data,
      }) => ({
        loading: pathname !== data.get('pathname'),
        pathname,
      }))
        .then(() => {
          if (!this.state.loading) {
            return this.state.data.toJS()
          }
          return user.getByPath({
            pathname,
          })
        })
        .then((data) => {
          delete this.publicProfile
          return this.setState({
            data: fromJS(data),
            loading: false,
          })
        }))
  }

  set(path, value) {
    let nuData
    const { data, } = this.state
    const val = fromJS(value)
    if (path.length) {
      nuData = data.setIn(path, value ? val : value)
    } else {
      nuData = val
    }
    this.setState({
      data: nuData,
    })
  }

  redirect() {}

  login = (user) => this.setState(() => ({
    data: fromJS(user || {}),
    loading: false,
  }))

  update(updates) {
    return user.update(updates).then((updates) => this.merge(updates))
  }

  merge(updates) {
    return this.setState(({
      data,
    }) => ({
      data: data.merge(updates),
    }))
  }

  loggedIn = () => {
    const { data, } = this.state
    if (!data) {
      return false
    }
    const email = data.get('email')
    const providers = data.get('providers')
    return !!(email || (providers && providers.size))
  }

  logout = async () => {
    if (this.loggingOut) {
      return this.loggingOut
    }
    const loggingOut = user
      .logout()
      .then(this.login, () => this.login())
      .then(() => {
        delete this.loggingOut
      })
    this.loggingOut = loggingOut
    return loggingOut
  }

  detachProvider = (key) => user.detachProvider(key).then(({ data: { path, value, }, }) => {
    this.set(path, value)
  })

  startLogin = (key) => {
    const path = apiurl(`auth/${key}/`)
    const posts = providers
      .find((provider) => provider.get('provider') === key)
      .get('post')
    const starter = posts ? user.auth(key) : this.openPopup(path)
    return starter.then(() => this.check())
  }

  check() {
    return user.check().then(this.login, () => this.login())
  }

  closePopup = () => {
    const { popup, } = this
    if (popup) {
      popup.close()
      clearInterval(this.popupId)
      delete this.popup
      delete this.popupId
    }
  }

  checkPopup(popup) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (!popup || popup.closed || isUndefined(popup.closed)) {
          clearInterval(check)
          resolve()
        }
      }, 500)
      this.popupId = check
    })
  }

  createPopup = (url) => {
    const context = this
    const width = 600
    const height = 600
    const left = window.innerWidth / 2 - width / 2
    const top = window.innerHeight / 2 - height / 2
    context.closePopup()

    return window.open(
      url,
      '',
      `dependent=1, toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    )
  }

  openPopup = (url) => {
    const context = this
    const popup = context.createPopup(url)
    return context.checkPopup(popup)
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const User = new UserContainer()
User.check()

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const UserProvider = (props) => (
  <Provider inject={props.inject || [User]}>{props.children}</Provider>
)
UserProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const UserSubscribe = (props) => (
  <Subscribe to={props.to || [User]}>{props.children}</Subscribe>
)
UserSubscribe.propTypes = {
  to: array,
  children: any,
}
