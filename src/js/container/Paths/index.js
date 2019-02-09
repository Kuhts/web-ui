import React from 'react'
import {
  array,
  any,
} from 'prop-types'
import { Container, Subscribe, Provider, } from 'unstated'

export class PathsContainer extends Container {
  constructor(props) {
    super(props)
    this.state = props
  }

  map(fn) {
    return this.state.path.map(fn)
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const Paths = new PathsContainer({
  path: ['dashboard'],
})

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const PathsProvider = (props) => (
  <Provider inject={props.inject || [Paths]}>{props.children}</Provider>
)
PathsProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const PathsSubscribe = (props) => (
  <Subscribe to={props.to || [Paths]}>{props.children}</Subscribe>
)
PathsSubscribe.propTypes = {
  to: array,
  children: any,
}
