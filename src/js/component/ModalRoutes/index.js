import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import {
  Login,
  Modal,
  Logout,
} from 'js/component'

const LoginModal = Modal({
  children: Login,
  directions: {
    forward: '/app/',
    back: '/',
  },
})

export const ModalRoutes = () => (
  <Switch>
    <Route path="*/login" component={LoginModal} />
    <Route path="*/logout" component={Logout} />
  </Switch>
)
