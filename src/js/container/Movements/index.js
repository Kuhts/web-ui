import React from 'react'
import {
  movements,
} from 'js/service'
import {
  array,
  any,
} from 'prop-types'
import {
  Container,
  Subscribe,
  Provider,
} from 'unstated'

export class MovementsContainer extends Container {
  state = {
    minCache: 1000 * 60 * 5,
    lastLoaded: new Date(0),
    items: [{
      id: 'a',
      title: 'Push Ups',
      description: 'on your toes. no knees. no spreadsheets',
    }],
  }

  get(identifier) {
    return this.state.items.find(({ id, }) => id === identifier)
  }

  load = async () => {
    if ((new Date() - this.state.minCache) <= this.state.lastLoaded) {
      return
    }
    const lastUpdated = await movements.lastUpdated()
    if (lastUpdated <= this.state.lastLoaded) {
      return
    }
    const {
      items,
      lastLoaded,
    } = await movements.getAll()
    this.setState({
      items,
      lastLoaded,
    })
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const Movements = new MovementsContainer()

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const MovementsProvider = (props) => (
  <Provider inject={props.inject || [Movements]}>{props.children}</Provider>
)
MovementsProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const MovementsSubscribe = (props) => (
  <Subscribe to={props.to || [Movements]}>{props.children}</Subscribe>
)
MovementsSubscribe.propTypes = {
  to: array,
  children: any,
}
