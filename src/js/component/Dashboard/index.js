import React from 'react'
import styled from 'react-emotion'
import {
  NavLink,
} from 'react-router-dom'
import {
  Icon,
} from 'antd'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'
import {
  DocumentsFeed,
  ContentContainer,
} from 'js/component'

UnstyledDashboard.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}

const StyledDashboard = styled(UnstyledDashboard)`
.feed-container {
  position: relative;
}
`

export {
  StyledDashboard as Dashboard,
}

function UnstyledDashboard({
  className,
}) {
  return (
    <ContentContainer className={className}>
      <h2>
        Posts&nbsp;
        <NavLink to="newdocument">
          <Icon type="plus-square" />
        </NavLink>
      </h2>
      <div className="feed-container">
        <DocumentsFeed />
      </div>
    </ContentContainer>
  )
}
