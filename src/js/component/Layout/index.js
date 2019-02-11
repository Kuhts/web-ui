import React from 'react'
import { Layout as AntdLayout, } from 'antd'
import classnames from 'classnames'
import styled from 'react-emotion'

export const UnstyledLayout = ({
  className, flexed, content, ...props
}) => (
  <AntdLayout
    {...props}
    className={classnames(className, {
      flexed,
      content,
    })}
  />
)

export const StyledLayout = styled(UnstyledLayout)`
  background: none;
  &.flexed {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  &.content {
    flex: 1;
  }
`
export const Layout = StyledLayout
