import React from 'react'
import {
  NavLink,
  withRouter,
} from 'react-router-dom'
import {
  Layout,
  Icon,
  List,
  Row,
  Col,
} from 'antd'
import _ from 'lodash'
import {
  Subscribe,
} from 'unstated'
import styled from 'react-emotion'
import {
  User,
  Sider as SiderContainer,
} from 'js/container'
import {
  contentPadding,
} from 'js/styles'
import {
  object,
  oneOfType,
  string,
  array,
} from 'prop-types'
const { Footer: FooterLayout, } = Layout
const year = (new Date()).getYear() + 1900
UnstyledFooter.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
const StyledFooter = styled(UnstyledFooter)`
  padding: ${contentPadding / 2}px;
  background: #fff;
  text-align: right;
`
const Footer = StyledFooter

const footerGroups = [{
  title: 'Public',
  key: 'public',
}, {
  title: 'Posts',
  key: 'post',
  loggedIn: true,
}, {
  title: 'Account',
  key: 'user',
  loggedIn: true,
}, {
  key: 'loggedOut',
  loggedIn: false,
}]

const subscriptions = [User, SiderContainer]
UnstyledNavList.propTypes = {
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
const StyledNavList = styled(UnstyledNavList)`
.tap-nav-group {
  margin-top: ${contentPadding}px;
  padding: 0 ${contentPadding / 2}px;
  &-title {
    text-align: left;
    margin: 0;
  }
  .anticon {
    display: inline-block;
    width: 20px;
    text-align: center;
  }
}
.ant-list-item-content span {
  text-indent: 5px;
  display: inline-block;
}
`
const NavList = withRouter(StyledNavList)

export {
  Footer,
}

function UnstyledFooter({
  className,
}) {
  return (
    <FooterLayout className={className}>
      <NavList />
      <p>
        Indefensible&nbsp;&copy;&nbsp;
        {year}
      </p>
    </FooterLayout>
  )
}
function UnstyledNavList({
  match,
  className,
  location,
}) {
  return (
    <Subscribe to={subscriptions}>
      {(user, sider) => {
        const loggedIn = user.loggedIn()
        return (
          <Row className={className}>
            <List
              dataSource={footerGroups}
              renderItem={({
                title,
                key,
                loggedIn: scopedLgdIn,
              }) => (
                !_.isBoolean(scopedLgdIn) || scopedLgdIn === loggedIn ? (
                  <Col
                    className="tap-nav-group"
                    xs={{ span: 24, }}
                    sm={{ span: 12, }}
                    md={{ span: 8, }}>
                    <h3 className="tap-nav-group-title">{title}</h3>
                    <List
                      dataSource={sider.group(key)}
                      renderItem={Item} />
                  </Col>
                ) : []
              )} />
          </Row>
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
    <List.Item key={makeKey(to)}>
      <NavLink to={to}>
        {icon ? <Icon type={icon} /> : []}
        <span>{text}</span>
      </NavLink>
    </List.Item>
  )
}

function sterilize(key) {
  return key.split('/').join('')
}

function makeKey(to) {
  return sterilize(`nav-${to}`)
}
