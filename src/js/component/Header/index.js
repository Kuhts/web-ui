import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import { Icon, Layout, Breadcrumb, } from 'antd'
import { Subscribe, } from 'unstated'
import styled from 'react-emotion'
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
} from 'js/styles'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'

const {
  Item: BreadcrumbItem,
} = Breadcrumb
const profileDimension = headerHeight - headerVerticalPadding - headerVerticalPadding

const StyledHeader = styled(UnstyledHeader)`
  background: #fff;
  padding: 0 24px;
  height: ${headerHeight}px;
  line-height: ${headerHeight}px;
  font-size: ${contentPadding}px;
  display: flex;
  text-align: center;
  .profile-image {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.65);
    box-sizing: border-box;
    border-radius: 50%;
    margin: ${headerVerticalPadding}px;
  }
  .profile-link {
    display: inline-block;
    border-radius: 50%;
  }
  .space-left {
    margin-left: ${contentPadding}px;
  }
  .header-breadcrumbs {
    line-height: ${headerHeight}px;
    .ant-breadcrumb-link {
      line-height: ${headerHeight}px;
    }
  }
  .trigger {
    cursor: pointer;
    transition: color 0.3s;
    line-height: 56px;
  }
`

// const Header = withRouter(StyledHeader)
const Header = StyledHeader
export {
  Header,
}

function UnstyledHeader({
  className,
}) {
  return (
    <Subscribe to={[Sider, Paths, User]}>
      {(sider, paths, user) => {
        const { data, } = user.state
        return (
          <Layout.Header className={className}>
            <ContentContainer>
              <NavLink to="/app/">
                <Icon
                  className="trigger"
                  type="bars"
                />
              </NavLink>
              {user.loggedIn() ? (
                <NavLink className="profile-link space-left" to="/app/profile/">
                  <img
                    width={profileDimension}
                    height={profileDimension}
                    className="profile-image"
                    src={data.get('image')}
                    alt={`User icon of ${data.get('name')}`}
                  />
                </NavLink>
              ) : []}
              <span className="app-name space-left">Character Astronomy</span>
              <Breadcrumb className="header-breadcrumbs space-left">
                {paths.map((text) => (
                  <BreadcrumbItem key={text}>{text}</BreadcrumbItem>
                ))}
              </Breadcrumb>
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
