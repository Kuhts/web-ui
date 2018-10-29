import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {
  Button,
} from 'antd'
import styled from 'react-emotion'
import {
  User,
} from 'js/container'
import {
  AuthButtons,
  UpdateUsername,
} from 'js/component'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'
import classnames from 'classnames'

UnstyledProfile.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
const Profile = styled(UnstyledProfile)`
  .space-bottom-2 {
    margin-bottom: 16px;
  }
`

export {
  Profile,
}

function UnstyledProfile({
  className,
}) {
  return (
    <div className={classnames('clearfix', className)}>
      <div className="clearfix space-bottom-2">
        <NavLink to={User.state.data.get('pathname')}>
          <Button>Public Profile</Button>
        </NavLink>
      </div>
      <h3>Username</h3>
      <UpdateUsername size="large" />
      <h3>Authentication</h3>
      <div className="clearfix">
        <AuthButtons
          onClick={(key, provided) => provided ? () => User.detachProvider(key) : () => User.startLogin(key)}
        />
      </div>
    </div>
  )
}
