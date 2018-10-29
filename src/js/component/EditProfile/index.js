import React from 'react'
import styled from 'react-emotion'
import { User, } from 'js/container'
import { AuthButtons, UpdateUsername, } from 'js/component'
import classnames from 'classnames'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'

const UnstyledEditProfile = ({ className, }) => (
  <div className={classnames('clearfix', className)}>
    <h2 className="title">Edit Profile</h2>
    <h3>Username</h3>
    <UpdateUsername size="large" />
    <h3>Authentication</h3>
    <div className="clearfix">
      <AuthButtons
        onClick={(key, provided) => provided ? () => User.detachProvider(key) : () => User.startLogin(key)
        }
      />
    </div>
  </div>
)
UnstyledEditProfile.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
const EditProfile = styled(UnstyledEditProfile)`
  .space-bottom-2 {
    margin-bottom: 16px;
  }
`

export { EditProfile, }
