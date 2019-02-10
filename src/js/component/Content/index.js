import React from 'react'
import styled from 'react-emotion'
import classnames from 'classnames'
import {
  contentPadding,
  extraScrollSpace,
} from 'js/styles'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'

const UnstyledContent = ({
  className, flexed, content, ...props
}) => (
  <div
    {...props}
    className={classnames('content-wrapper', className, {
      flexed,
      content,
    })}
  />
)

UnstyledContent.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
const StyledContent = styled(UnstyledContent)`
  padding: ${contentPadding / 2}px ${contentPadding / 2}px ${extraScrollSpace}px;
  &.flexed {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  &.content {
    flex: 1;
  }
`
const Content = StyledContent
export { Content, }
