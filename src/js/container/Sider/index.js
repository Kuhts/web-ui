import React from 'react'
import { reduce, } from 'lodash'
import { Container, Subscribe, Provider, } from 'unstated'
import history from 'js/history'
import { Local, } from 'js/container'
import {
  array,
  any,
} from 'prop-types'

const publicPages = [
  {
    to: '/',
    text: 'Home',
    icon: 'heat-map',
    group: 'public',
  },
  {
    to: '/about/',
    text: 'About',
    icon: 'radar-chart',
    group: 'public',
  },
  {
    to: '/services/',
    text: 'Services',
    icon: 'sliders',
    group: 'public',
  },
  {
    to: '/contact/',
    text: 'Contact',
    icon: 'contacts',
    group: 'public',
  },
  {
    to: '/technology/',
    text: 'Tech',
    icon: 'deployment-unit',
    group: 'public',
  }
]
const loggedOutPages = [
  {
    to: 'login',
    text: 'Login',
    icon: 'login',
    group: 'loggedout',
  },
  {
    to: 'register',
    text: 'Register',
    group: 'loggedout',
  },
  {
    to: 'forgotpassword',
    text: 'Forgot',
    group: 'loggedout',
  }
]

const postPages = [
  {
    to: '/app/',
    text: 'Dashboard',
    icon: 'experiment',
    group: 'post',
  },
  {
    to: '/app/post/',
    text: 'Document',
    icon: 'project',
    group: 'post',
  },
  {
    to: '/app/post/edit',
    text: 'Edit',
    icon: 'edit',
    group: 'post',
  },
  {
    to: '/app/post/suggest',
    text: 'Suggest',
    icon: 'message',
    group: 'post',
  },
  {
    to: '/app/post/arrange',
    text: 'Arrange',
    icon: 'switcher',
    group: 'post',
  }
]
const userPages = [
  {
    to: '/app/profile/',
    text: 'Profile',
    icon: 'user',
    group: 'user',
  },
  {
    to: 'logout',
    text: 'Logout',
    icon: 'logout',
    group: 'user',
  }
]

const pages = {
  public: publicPages,
  loggedOut: loggedOutPages,
  post: postPages,
  user: userPages,
}

const allPages = reduce(pages, (memo, group) => memo.concat(group), [])

export class SiderContainer extends Container {
  constructor(props) {
    super(props)
    this.state = props
  }

  toggle = (collapsed) => this.setState(() => ({
    collapsed,
  })).then(() => Local.save(['sider', 'collapsed'], collapsed))

  selectChange = ({ keyPath, }) => this.setState({
    selected: keyPath,
  })

  openChange = (open) => this.setState({
    open,
  }).then(() => Local.save(['sider', 'open'], open))

  redirect = (route) => {
    this.setState({
      open: null,
      selected: null,
    })
    history.push(route)
  }

  openKeys(pathname) {
    const page = allPages.find(
      ({ to, }) => to === pathname || `/${to}` === pathname
    )
    if (!page) {
      return null
    }
    const { group, } = page
    return group
  }

  render(key, mapper) {
    const subset = pages[key]
    return subset.map(mapper)
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const open = Local.getIn(['sider', 'open'])
const collapsed = Local.getIn(['sider', 'collapsed'])
export const Sider = new SiderContainer({
  collapsed,
  open: open ? open.toJS() : [],
})

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const SiderProvider = ({
  inject,
  children,
}) => (
  <Provider inject={inject || [Sider]}>{children}</Provider>
)

SiderProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const SiderSubscribe = ({
  to,
  children,
}) => (
  <Subscribe to={to || [Sider]}>{children}</Subscribe>
)
SiderSubscribe.propTypes = {
  to: array,

  children: any,
}
