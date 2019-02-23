import React from 'react'
import {
  ImmutableContainer,
} from 'js/utils'
import {
  workouts,
} from 'js/service'
import {
  array,
  any,
} from 'prop-types'
import {
  Subscribe,
  Provider,
} from 'unstated'

export class WorkoutsContainer extends ImmutableContainer {
  constructor(props) {
    super(props)
    this.state = props
  }

  setCurrent(id) {
    const record = this.record(id)
    const current = record || null
    this.setState({
      current,
    })
    return !!current
  }

  get(id) {
    return workouts.get(id)
  }

  access({
    results = 10,
    page,
    sortField,
    sortOrder,
  }) {
    return workouts.getMany({
      results,
      page,
      sortField,
      sortOrder,
    }).then(({
      data = [],
      total,
    }) => this.setState({
      records: data,
      total,
    }))
  }

  records() {
    return this.state.records
  }

  record(identifier) {
    return this.state.recordById[identifier]
  }

  create(data) {
    return workouts.create(data)
  }

  update(id, data) {
    return workouts.update(id, data)
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const Workouts = new WorkoutsContainer({
  // path: ['one', 'two'],
  current: {
    contents: [],
    id: '',
    description: '',
    name: '',
  },
  recordById: {},
  possible: [],
  records: [],
})

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const WorkoutsProvider = (props) => (
  <Provider inject={props.inject || [Workouts]}>{props.children}</Provider>
)
WorkoutsProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const WorkoutsSubscribe = (props) => (
  <Subscribe to={props.to || [Workouts]}>{props.children}</Subscribe>
)
WorkoutsSubscribe.propTypes = {
  to: array,
  children: any,
}
