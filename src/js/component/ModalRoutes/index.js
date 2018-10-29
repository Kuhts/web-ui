import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import {
  Login,
  Modal,
  Logout,
  NewDocument,
} from 'js/component'

const LoginModal = Modal({
  children: Login,
  directions: {
    forward: '/app/',
    back: '/',
  },
})

const NewDocumentModal = Modal({
  children: NewDocument,
})

export const ModalRoutes = () => (
  <Switch>
    <Route path="*/newdocument" component={NewDocumentModal} />
    <Route path="*/login" component={LoginModal} />
    <Route path="*/logout" component={Logout} />
  </Switch>
)
