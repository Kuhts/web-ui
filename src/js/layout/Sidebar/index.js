import React from 'react'
import {
  Layout,
  Content,
  // Footer,
  Header,
} from 'js/component'

import {
  presetPalettes,
} from '@ant-design/colors'
import { Helmet, } from 'react-helmet'

export const Sidebar = ({
  title,
  component: Component,
  ...props
}) => (
  <Layout style={{
    backgroundColor: presetPalettes.volcano[0],
    height: '100%',
  }}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Header />
    <Content>
      <Component {...props} />
    </Content>
  </Layout>
)
// <Footer />
