import React from 'react'
import styled from 'react-emotion'
import classnames from 'classnames'
import { Button, Icon, } from 'antd'
import { Subscribe, } from 'unstated'
import { User, } from 'js/container'
import {
  func,
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'

export const UnstyledAuthButtons = props => (
  <Subscribe to={[User]}>
    {(user) => {
      const { state, } = user
      const { providers, data, } = state
      return (
        <div className={classnames('clearfix', props.className)}>
          {providers.map((provider) => {
            const key = provider.get('provider')
            const disabled = provider.get('disabled')
            const provided = data.getIn(['providers', key])
            const onClick = props.onClick(key, provided)
            return (
              <div key={key} className="btn-row">
                <Button
                  size="large"
                  disabled={disabled}
                  type={provided ? 'danger' : 'primary'}
                  onClick={onClick}
                >
                  <Icon type={key} />
                  {provider.get('name')}
                </Button>
              </div>
            )
          })}
        </div>
      )
    }}
  </Subscribe>
)
UnstyledAuthButtons.propTypes = {
  onClick: func,
  className: oneOfType([
    string,
    array,
    object
  ]),
}

const StyledAuthButtons = styled(UnstyledAuthButtons)`
  .btn-row {
    float: left;
    padding-right: 8px;
    padding-bottom: 8px;
  }
`
const AuthButtons = StyledAuthButtons
export { AuthButtons, }
