import React from 'react'
import { fromJS, } from 'immutable'
import { Container, Subscribe, Provider, } from 'unstated'
import { SITE_KEY, } from 'config'
import {
  array,
  any,
} from 'prop-types'

export class LocalContainer extends Container {
  constructor(key, localStorage) {
    super()
    this.key = key
    this.ls = localStorage
    this.state = {
      data: fromJS(this.read()),
    }
  }

  getIn = (path) => this.state.data.getIn(path)

  setIn = (path, value) => this.setState(({
    data,
  }) => ({
    data: data.setIn(path, value),
  }))

  save = async (path, value) => {
    if (path) {
      await this.setIn(path, fromJS(value))
    }
    const {
      state,
      ls,
      key,
    } = this
    const data = state.data.toJS()
    ls.setItem(key, JSON.stringify(data))
    return state.data
  }

  read = () => {
    const gotten = this.ls.getItem(this.key)
    return JSON.parse(gotten || '{}')
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const Local = new LocalContainer(SITE_KEY, window.localStorage)

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const LocalProvider = (props) => (
  <Provider inject={props.inject || [Local]}>{props.children}</Provider>
)
LocalProvider.propTypes = {
  inject: array,
  children: any,
}
// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const LocalSubscribe = (props) => (
  <Subscribe to={props.to || [Local]}>{props.children}</Subscribe>
)
LocalSubscribe.propTypes = {
  to: array,
  children: any,
}
