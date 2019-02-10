import React from 'react'
import {
  Layout,
  Content,
  // Footer,
  Header,
} from 'js/component'
import { Helmet, } from 'react-helmet'

export const Sidebar = ({
  title,
  component: Component,
  ...props
}) => (
  <Layout>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Header />
    <Content content>
      <Component {...props} />
    </Content>
  </Layout>
)
// <Footer />
