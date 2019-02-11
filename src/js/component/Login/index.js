import React, { Fragment, } from 'react'
import { Redirect, } from 'react-router-dom'
import { Helmet, } from 'react-helmet'
import { User, Sider, } from 'js/container'
import { AuthButtons, } from 'js/component'
import {
  shape,
  string,
} from 'prop-types'

export {
  Login,
}

function Login(props) {
  const { location, } = props
  const state = location.state || {}
  const prev = state.prev || {}
  const pathname = prev.pathname || '/app/'
  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {User.loggedIn()
        ? <Redirect to={pathname} />
        : (
          <AuthButtons
            onClick={(key) => () => User.startLogin(key).then(() => {
              Sider.redirect(pathname)
            })}
          />
        )}
    </Fragment>
  )
}
Login.propTypes = {
  location: shape({
    state: shape({
      prev: shape({
        pathname: string,
      }),
    }),
  }),
}
