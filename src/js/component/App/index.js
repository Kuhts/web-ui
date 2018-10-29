import React, { Fragment, } from 'react'
import { Switch, Route, } from 'react-router-dom'
import { Subscribe, } from 'unstated'
import { User, } from 'js/container'
import { Helmet, } from 'react-helmet'
import { ModalRoutes, } from 'js/component/ModalRoutes'
import { PrivateRoute, } from 'js/component/PrivateRoute'
import { PrivateApp, } from 'js/component/PrivateApp'
import { PublicApp, } from 'js/component/PublicApp'
import { Icon, } from 'antd'
import { SITE_NAME, } from 'config'

const loader = <Icon type="loading" style={{ fontSize: 40, }} />
const title = (
  <Helmet defaultTitle={SITE_NAME} titleTemplate={`${SITE_NAME} - %s`} />
)

export const App = () => (
  <Fragment>
    {title}
    <Subscribe to={[User]}>
      {user => !user.state.loading ? (
        <Fragment>
          <Switch>
            <PrivateRoute path="/app/" component={PrivateApp} />
            <Route component={PublicApp} />
          </Switch>
          <ModalRoutes />
        </Fragment>
      ) : (
        loader
      )
      }
    </Subscribe>
  </Fragment>
)
