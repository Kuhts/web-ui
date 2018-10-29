import React from 'react'
import {
  Layout, Content, Footer, Sider, Header,
} from 'js/component'
import { Helmet, } from 'react-helmet'

export const Sidebar = ({ title, component: Component, ...props }) => (
  <Layout className="full-height">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Sider />
    <Layout flexed>
      <Header />
      <Content content>
        <Component {...props} />
      </Content>
      <Footer />
    </Layout>
  </Layout>
)
