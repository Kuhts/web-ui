import React from 'react'
import { Layout, } from 'antd'
import styled from 'react-emotion'
import moment from 'moment'
import { contentPadding, } from 'js/styles'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'
const { Footer: FooterLayout, } = Layout
const year = moment().year()
const UnstyledFooter = ({ className, }) => (
  <FooterLayout className={className}>
    Character&nbsp;Astronomy&nbsp;&copy;&nbsp;
    {year}
  </FooterLayout>
)
UnstyledFooter.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
const StyledFooter = styled(UnstyledFooter)`
  padding: ${contentPadding}px;
  background: #fff;
  text-align: right;
`
const Footer = StyledFooter

export {
  Footer,
}
