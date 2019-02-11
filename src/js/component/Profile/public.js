import React from 'react'
import { Button, } from 'antd'
import { UserContainer, } from 'js/container'
import { Subscribe, } from 'unstated'
import {
  shape,
  string,
} from 'prop-types'
const User = new UserContainer()
PublicProfile.propTypes = {
  match: shape({
    params: shape({
      path: string,
    }),
  }),
}
export {
  PublicProfile,
}

function PublicProfile({
  match,
}) {
  const pathname = match.params.path
  User.load(pathname)
  return (
    <Subscribe to={[User]}>{(user) => <Button>Public Profile</Button>}</Subscribe>
  )
}
