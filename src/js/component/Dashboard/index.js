import React from 'react'
import styled from 'react-emotion'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'
import {
  contentPadding,
} from 'js/styles'
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
.headline {
  padding: 0 ${contentPadding / 2}px;
}
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
      <div className="feed-container">
        <DocumentsFeed />
      </div>
    </ContentContainer>
  )
}
