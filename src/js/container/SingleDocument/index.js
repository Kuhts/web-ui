import React from 'react'
import {
  ImmutableContainer,
} from 'js/utils'
import {
  documents,
} from 'js/service'
import {
  array,
  any,
} from 'prop-types'
import {
  Subscribe,
  Provider,
} from 'unstated'

export class SingleDocumentContainer extends ImmutableContainer {
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
    return documents.get(identifier).then((data) => {
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
    return documents.create(data)
  }

  update(id, data) {
    return documents.update(id, data)
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
export const SingleDocument = new SingleDocumentContainer({
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
export const SingleDocumentProvider = (props) => (
  <Provider inject={props.inject || [SingleDocument]}>{props.children}</Provider>
)
SingleDocumentProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const SingleDocumentSubscribe = (props) => (
  <Subscribe to={props.to || [SingleDocument]}>{props.children}</Subscribe>
)
SingleDocumentSubscribe.propTypes = {
  to: array,
  children: any,
}
