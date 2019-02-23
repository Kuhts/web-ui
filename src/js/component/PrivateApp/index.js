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
  CreateWorkout,
} from 'js/component'
import {
  Sidebar,
} from 'js/layout'
import {
  string,
  shape,
} from 'prop-types'
import {
  user,
  workouts,
} from 'js/service'

const generate = (title, component) => (props) => (
  <Sidebar
    title={title}
    component={component}
    {...props}
  />
)

const PrivateApp = ({
  match: {
    path,
  },
}) => (
  <Switch>
    <Route
      strict
      path={user.urls.publicProfile(':path')}
      component={generate('Public Profile', PublicProfile)} />
    <Route
      strict
      path={user.urls.profile()}
      component={generate('Profile', Profile)} />
    <Route
      strict
      path={workouts.urls.edit(':id')}
      component={generate('Edit Workout', NewWorkout)} />
    <Route
      strict
      path={workouts.urls.create()}
      component={generate('New Workout', CreateWorkout)} />
    <Route
      strict
      path={`${path}`}
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
