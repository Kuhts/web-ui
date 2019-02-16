import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import {
  Dashboard,
  NewWorkout,
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

const generate = (title, component) => (props) => (
  <Sidebar
    title={title}
    component={component}
    {...props}
  />
)

const PrivateApp = ({
  match,
}) => (
  <Switch>
    <Route
      strict
      path={`${match.path}profile/:path`}
      component={generate('Public Profile', PublicProfile)} />
    <Route
      strict
      path={`${match.path}profile/`}
      component={generate('Profile', Profile)} />
    <Route
      strict
      path={`${match.path}workout/create`}
      component={generate('New Workout', NewWorkout)} />
    <Route
      strict
      path={`${match.path}`}
      component={generate('Dashboard', Dashboard)} />
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
