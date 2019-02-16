import React from 'react'
import {
  Layout,
  Content,
  // Footer,
  Header,
} from 'js/component'
import {
  Row,
} from 'antd'
import {
  headerHeight,
} from 'js/styles'
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
    height: '100%',
  }}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Row style={{
      minHeight: '100%',
    }}>
      <Content style={{
        paddingTop: headerHeight,
        backgroundColor: presetPalettes.volcano[0],
        minHeight: '100%',
      }}>
        <Component {...props} />
      </Content>
    </Row>
    <Header {...props} />
  </Layout>
)
