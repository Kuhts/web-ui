import React, { Fragment, } from 'react'
import { Helmet, } from 'react-helmet'
import { Subscribe, } from 'unstated'
import { User, Sider, } from 'js/container'

const Logout = props => (
  <Subscribe to={[User, Sider]}>
    {(user, sider) => {
      user.logout().then(() => {
        sider.redirect('/')
      })
      return (
        <Fragment>
          <Helmet>
            <title>Logout</title>
          </Helmet>
        </Fragment>
      )
    }}
  </Subscribe>
)

export { Logout, }
