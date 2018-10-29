import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import {
  Dashboard,
  Profile,
  PublicProfile,
} from 'js/component'
import {
  Sidebar,
} from 'js/layout'
import {
  string,
  shape,
} from 'prop-types'

const DocumentPage = props => (
  <Sidebar
    title="Document"
    component={() => <div></div>}
    {...props}
  />
)

const PublicProfilePage = props => (
  <Sidebar
    title="Public Profile"
    component={PublicProfile}
    {...props}
  />
)
const ProfilePage = props => (
  <Sidebar
    title="Profile"
    component={Profile}
    {...props}
  />
)
const DashboardPage = props => (
  <Sidebar
    title="Dashboard"
    component={Dashboard}
    {...props}
  />
)

const PrivateApp = ({
  match,
}) => (
  <Switch>
    <Route strict path={`${match.path}document/:id`} component={DocumentPage} />
    <Route strict path={`${match.path}profile/:path`} component={PublicProfilePage} />
    <Route strict path={`${match.path}profile/`} component={ProfilePage} />
    <Route strict path={`${match.path}`} component={DashboardPage} />
  </Switch>
)
PrivateApp.propTypes = {
  match: shape({
    path: string,
  }),
}

export {
  PrivateApp,
}
