import React from 'react'
import styled from 'react-emotion'
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
position: relative;
`

export {
  StyledDashboard as Dashboard,
}

function UnstyledDashboard({
  className,
}) {
  return (
    <ContentContainer className={className}>
      <DocumentsFeed />
    </ContentContainer>
  )
}
