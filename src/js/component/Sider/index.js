import React from 'react'
import {
  NavLink,
  withRouter,
} from 'react-router-dom'
import {
  Layout,
  Menu,
  Icon,
} from 'antd'
import {
  Subscribe,
} from 'unstated'
import styled from 'react-emotion'
import {
  User,
  Sider as SiderContainer,
} from 'js/container'
import {
  extraScrollSpace,
} from 'js/styles'
import {
  object,
  oneOfType,
  string,
  array,
} from 'prop-types'
const {
  Sider: SiderLayout,
} = Layout
const {
  SubMenu,
} = Menu

const subscriptions = [User, SiderContainer]
UnstyledSider.propTypes = {
  match: object,
  location: object,
  className: oneOfType([
    string,
    array,
    object
  ]),
}
Item.propTypes = {
  to: string,
  icon: string,
  text: string,
}
const StyledSider = styled(UnstyledSider)`
.sidebar-menu-container {
  padding-bottom: ${extraScrollSpace}px;
}
.ant-menu-inline {
  .ant-menu-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
.ant-menu-item-group-title {
  display: none;
}
`
const Sider = withRouter(StyledSider)

export {
  Sider,
}

function UnstyledSider({
  match,
  className,
  location,
}) {
  return (
    <Subscribe to={subscriptions}>
      {(user, sider) => {
        const { pathname, } = location
        const loggedIn = user.loggedIn()
        const key = makeKey(pathname)
        return (
          <SiderLayout
            trigger={null}
            className={className}
            collapsible
            collapsed={sider.state.collapsed}
            breakpoint="md"
            collapsedWidth="0"
          >
            <Menu
              key="menu"
              className="height-match sidebar-menu-container"
              theme="dark"
              mode="inline"
              selectedKeys={sider.state.selected || [key]}
              openKeys={sider.state.open}
              onSelect={sider.selectChange}
              onOpenChange={sider.openChange}
            >
              <SubMenu key="public" title="Public">
                <Menu.ItemGroup>
                  {sider.render('public', Item)}
                </Menu.ItemGroup>
              </SubMenu>
              {loggedIn ? (
                <SubMenu key="post" title="App">
                  <Menu.ItemGroup>
                    {sider.render('post', Item)}
                  </Menu.ItemGroup>
                </SubMenu>
              ) : (
                []
              )}
              {loggedIn ? (
                <SubMenu key="user" title="Profile">
                  <Menu.ItemGroup>
                    {sider.render('user', Item)}
                  </Menu.ItemGroup>
                </SubMenu>
              ) : (
                []
              )}
              {loggedIn ? [] : sider.render('loggedOut', Item)}
            </Menu>
          </SiderLayout>
        )
      }}
    </Subscribe>
  )
}

function Item({
  to,
  icon,
  text,
}) {
  return (
    <Menu.Item key={makeKey(to)}>
      <NavLink to={to}>
        {icon ? <Icon type={icon} /> : []}
        <span>{text}</span>
      </NavLink>
    </Menu.Item>
  )
}

function sterilize(key) {
  return key.split('/').join('')
}

function makeKey(to) {
  return sterilize(`nav-${to}`)
}
