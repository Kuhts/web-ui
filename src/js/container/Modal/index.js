import React from 'react'
import { Container, Subscribe, Provider, } from 'unstated'
import { Redirect, } from 'react-router-dom'

export class ModalContainer extends Container {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible || true,
      directions: props.directions || {},
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  closeModal = () => {
    this.setState({
      visible: false,
    })
  }

  forward = (to) => this.setState(({
    directions,
  }) => ({
    redirect: <Redirect to={to || directions.forward} />,
  }))

  back = (to) => this.setState(({
    directions,
  }) => ({
    redirect: <Redirect to={to || directions.back} />,
  }))
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const Modal = new ModalContainer({})

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const ModalProvider = (props) => (
  <Provider {...props} inject={props.inject || [Modal]}>
    {props.children}
  </Provider>
)

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const ModalSubscribe = (props) => (
  <Subscribe {...props} to={props.to || [Modal]}>
    {props.children}
  </Subscribe>
)
