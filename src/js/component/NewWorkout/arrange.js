import React from 'react'
import { Tree, } from 'antd'
import { Subscribe, } from 'unstated'
import {
  array,
  string,
} from 'prop-types'
import {
  SingleWorkout,
  Movements,
} from 'js/container'
import {
  workouts,
} from 'js/service'

const { TreeNode, } = Tree

const loop = (data) => data.map((item) => {
  const {
    children,
    title,
    key,
  } = item
  const props = {
    key,
    title,
  }
  return children && children.length ? (
    <TreeNode {...props}>{loop(children)}</TreeNode>
  ) : (
    <TreeNode {...props} />
  )
})

class Arrange extends React.Component {
  onDragEnter = () => {}

  onDrop = (info) => {
    const dropKey = info.node.props.eventKey
    const dragKey = info.dragNode.props.eventKey
    const dropPos = info.node.props.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
    const data = [...this.props.data]

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 // Has children
      && info.node.props.expanded // Is expanded
      && dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    return workouts.update(this.props.id, {
      contents: data,
    })

    function loop(data, key, callback) {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr)
        } else if (item.children) {
          loop(item.children, key, callback)
        }
      })
    }
  }

  render() {
    return (
      <Subscribe to={[SingleWorkout, Movements]}>
        {(doc) => (
          <Tree
            className="draggable-tree"
            defaultExpandedKeys={this.props.expandedKeys || []}
            draggable
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
          >
            {loop(doc.state.contents)}
          </Tree>
        )}
      </Subscribe>
    )
  }
}

Arrange.propTypes = {
  id: string,
  data: array,
  expandedKeys: array,
}

export {
  Arrange as View,
}
