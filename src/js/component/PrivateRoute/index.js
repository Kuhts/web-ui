import React from 'react'
import {
  Subscribe,
} from 'unstated'
import {
  any,
  object,
} from 'prop-types'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import {
  omit,
} from 'lodash'
import {
  User,
} from 'js/container'
const omissionProps = ['component', 'ref', 'location']

export {
  PrivateRoute,
}

PrivateRoute.propTypes = {
  component: any.isRequired,
  location: object,
}

function PrivateRoute(props) {
  const {
    component: Component,
    location,
  } = props
  return (
    <Route
      {...omit(props, omissionProps)}
      render={props => (
        <Subscribe to={[User]}>
          {user => (
            user.loggedIn() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  ...location,
                  pathname: '/login',
                  state: {
                    prev: location,
                  },
                }}
              />
            )
          )}
        </Subscribe>
      )}
    />
  )
}
