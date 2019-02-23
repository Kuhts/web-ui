import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import { Icon, Layout, } from 'antd'
import { Subscribe, } from 'unstated'
import styled from 'react-emotion'
import {
  SITE_NAME,
} from 'config'
import {
  ContentContainer,
} from 'js/component'
import {
  Sider,
  Paths,
  User,
} from 'js/container'
import {
  contentPadding,
  headerHeight,
  headerVerticalPadding,
  colors,
} from 'js/styles'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'
import {
  workouts,
} from 'js/service'

const profileDimension = headerHeight - headerVerticalPadding - headerVerticalPadding

const StyledHeader = styled(UnstyledHeader)`
  background: #fff;
  padding: 0 24px;
  height: ${headerHeight}px;
  line-height: ${headerHeight}px;
  font-size: ${contentPadding}px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
  border-bottom: 1px solid ${colors.grey};
  .profile-image {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.65);
    box-sizing: border-box;
    border-radius: 50%;
  }
  .space-left {
    margin-left: ${contentPadding / 2}px;
  }
  .header-breadcrumbs {
    line-height: ${headerHeight}px;
    .ant-breadcrumb-link {
      line-height: ${headerHeight}px;
    }
  }
  .center-wrapper {
    width: auto;
    margin: 0 auto;
    display: inline-block;
  }
  .trigger {
    cursor: pointer;
    transition: color 0.3s;
    line-height: 56px;
  }
  .button-wrapper {
    position: relative;
    display: block;
    height: ${headerHeight}px;
    width: ${headerHeight}px;
    text-align: center;
  }
  .float-left {
    float: left;
  }
`

// const Header = withRouter(StyledHeader)
const Header = StyledHeader
export {
  Header,
}

function UnstyledHeader(props) {
  const {
    className,
  } = props
  return (
    <Subscribe to={[Sider, Paths, User]}>
      {(sider, paths, user) => {
        const { data, } = user.state
        return (
          <Layout.Header className={className}>
            <ContentContainer>
              <div className="center-wrapper">
                <NavLink to="/app/" className="button-wrapper float-left">
                  <Icon
                    className="trigger"
                    type="bars"
                  />
                </NavLink>
                <NavLink to={workouts.urls.create()} className="button-wrapper float-left">
                  <Icon type="plus-square" />
                </NavLink>
                {user.loggedIn() ? (
                  <NavLink className="profile-link button-wrapper float-left" to="/app/profile/">
                    <img
                      width={profileDimension}
                      height={profileDimension}
                      className="profile-image"
                      src={data.get('image')}
                      alt={`User icon of ${data.get('name')}`}
                    />
                  </NavLink>
                ) : []}
                <span
                  className="app-name space-left float-left">
                  {SITE_NAME}
                </span>
              </div>
            </ContentContainer>
          </Layout.Header>
        )
      }}
    </Subscribe>
  )
}

UnstyledHeader.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
