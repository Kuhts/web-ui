import React from 'react'
import {
  List,
  Avatar,
} from 'antd'
import {
  oneOfType,
  array,
  string,
  object,
} from 'prop-types'
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
  className: oneOfType([
    array,
    string,
    object
  ]),
  category: string,
  url: string,
  title: string,
  description: string,
  image: string,
}

export {
  View,
}

const patterns = [{
  title: 'Push Ups',
  description: 'on your toes. no knees. no spreadsheets',
}]

function View({
  items = patterns,
}) {
  return (
    <List
      bordered
      size="small"
      dataSource={items}
      renderItem={(props) => <ListItem {...props} />} />
  )
}

function Item({
  className,
  category,
  url,
  title,
  description,
  image,
}) {
  return (
    <List.Item className={className}>
      <List.Item.Meta
        title={(
          <a href="https://ant.design">
            <Avatar src={category} />
            {title}
          </a>
        )}
        description={description}
      />
    </List.Item>
  )
}
