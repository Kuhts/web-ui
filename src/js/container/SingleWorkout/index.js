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

export class SingleWorkoutContainer extends ImmutableContainer {
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
    this.setState({ data: null, })
    return this.load(id).then(() => this)
  }

  load(id) {
    this.setState({
      id,
      loading: true,
    })
    const { id: identifier, } = this.state
    return workouts.get(identifier).then((data) => {
      const { loading, id, } = this.state
      if (id !== identifier || !loading) {
        return
      }
      this.setState({
        data,
        loading: false,
      })
    })
  }

  append(id) {
    // console.log('appending', id)
  }

  create(data) {
    return workouts.create(data)
  }

  update(id, data) {
    return workouts.update(id, data)
  }

  reset() {
    return this.setState({
      data: null,
      saved: false,
    })
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const SingleWorkout = new SingleWorkoutContainer({
  contents: [],
  id: '',
  description: '',
  name: '',
})

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const SingleWorkoutProvider = (props) => (
  <Provider inject={props.inject || [SingleWorkout]}>{props.children}</Provider>
)
SingleWorkoutProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const SingleWorkoutSubscribe = (props) => (
  <Subscribe to={props.to || [SingleWorkout]}>{props.children}</Subscribe>
)
SingleWorkoutSubscribe.propTypes = {
  to: array,
  children: any,
}
