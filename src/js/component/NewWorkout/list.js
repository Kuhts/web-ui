import React, {
  Fragment,
} from 'react'
import {
  List,
  Avatar,
} from 'antd'
import {
  Subscribe,
} from 'unstated'
import {
  oneOfType,
  array,
  string,
  object,
} from 'prop-types'
import {
  Loader,
} from 'js/component'
import {
  Movements,
  SingleWorkout,
} from 'js/container'
import styled from 'react-emotion'
const ListItem = styled(Item)`
.ant-list-item-meta {
  display: block;
  flex: none;
  width: 100%;
  .ant-avatar {
    margin-right: 10px;
  }
  &-content {
    overflow: hidden;
    flex: none;
    width: 100%;
  }
  &-description {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
  }
}
`
Item.propTypes = {
  category: string,
  url: string,
  title: string,
  description: string,
  image: string,
  id: string,
  className: oneOfType([
    array,
    string,
    object
  ]),
}

export {
  View,
}

function View() {
  return (
    <Subscribe to={[Movements]}>
      {(movements) => (
        <Loader promise={movements.load()}>
          <List
            bordered
            size="small"
            dataSource={movements.state.items}
            renderItem={(props) => (<ListItem {...props} />)} />
        </Loader>
      )}
    </Subscribe>
  )
}

function Item({
  description,
  className,
  category,
  title,
  image,
  url,
  id,
}) {
  const titleComponent = (
    <Fragment>
      <Avatar src={category} />
      {title}
    </Fragment>
  )
  return (
    <List.Item
      className={className}
      onClick={() => SingleWorkout.append(id)}>
      <List.Item.Meta
        description={description}
        title={titleComponent} />
    </List.Item>
  )
}
