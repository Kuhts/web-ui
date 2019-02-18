import React, { Fragment, } from 'react'
import { Helmet, } from 'react-helmet'
import { Subscribe, } from 'unstated'
import { User, Sider, } from 'js/container'
import { documents, } from 'js/service'

const CreateWorkout = (props) => (
  <Subscribe to={[User, Sider]}>
    {(user, sider) => {
      documents.create().then((doc) => {
        const { id, } = doc
        const url = documents.urls.edit(id)
        sider.redirect(url)
      })
      return (
        <Fragment>
          <Helmet>
            <title>Create Workout</title>
          </Helmet>
        </Fragment>
      )
    }}
  </Subscribe>
)

export { CreateWorkout, }
