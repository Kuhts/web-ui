import React, {
  Component,
} from 'react'
// import {
//   NavLink,
// } from 'react-router-dom'
import styled from 'react-emotion'
import {
  // Table,
  // Input,
  // Button,
  // Icon,
  List,
  // message,
  Avatar,
  Spin,
} from 'antd'
import classnames from 'classnames'
// import InfiniteScroll from 'react-infinite-scroller'
import reqwest from 'reqwest'
// import {
//   Documents,
//   Local,
// } from 'js/container'
// import {
//   Subscribe,
// } from 'unstated'
// import {
//   Resizable,
// } from 'react-resizable'
// import 'react-resizable/css/styles.css'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'

// const groupKey = [
//   'documentsFeed'
// ]
// const sizesKey = groupKey.concat(['sizes'])

const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo'

class UnstyledDocumentsFeed extends Component {
  state = {
    data: [],
    loading: false,
  }

  loadedRowsMap = {}

  componentDidMount() {
    this.fetchData((res) => {
      this.setState(() => ({
        data: res.results,
      }))
    })
  }

  fetchData = (success) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success,
    })
  }

  handleInfiniteOnLoad = ({
    startIndex,
    stopIndex,
  }) => {
    const data = this.state.data
    this.setState({
      loading: true,
    })
    for (let i = startIndex; i <= stopIndex; i += 1) {
      // 1 means loading
      this.loadedRowsMap[i] = 1
    }
    // if (data.length > 2000) {
    //   message.warning('Virtualized List loaded all')
    //   return this.setState({
    //     loading: false,
    //     finished: true,
    //   })
    // }
    return this.fetchData(({
      results,
    }) => this.setState(() => ({
      data: data.concat(results),
      loading: false,
    })))
  }

  isRowLoaded = ({ index, }) => !!this.loadedRowsMap[index]

  renderItem = ({
    index,
    key,
    style,
  }) => {
    const {
      data,
    } = this.state
    const item = data[index]
    const {
      name,
      email,
    } = item
    const styls = Object.assign({}, style, {
      borderBottom: 0,
      borderTop: '1px solid rgba(0, 0, 0, 0.15)',
    })
    return (
      <List.Item key={key} style={styls}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{name.last}</a>}
          description={email}
        />
        <div className="post-content-container">Bacon ipsum dolor amet leberkas tri-tip ham hock tongue, landjaeger pork beef ribs rump ball tip beef. Pig drumstick shankle, porchetta ball tip meatloaf burgdoggen boudin ham hock bacon pork loin.</div>
      </List.Item>
    )
  }

  render() {
    const {
      state,
      props,
    } = this
    const {
      data,
      loading,
    } = state
    const {
      className,
    } = props
    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width,
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={94}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    )
    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
    }) => (
      <AutoSizer disableHeight>
        {({
          width,
        }) => vlist({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
          width,
        })}
      </AutoSizer>
    )
    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({
          onRowsRendered,
        }) => autoSize({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
        })}
      </InfiniteLoader>
    )
    const spinner = () => <Spin className="demo-loading" />
    return (
      <div className={classnames(className, 'feed-wrapper')}>
        <List>
          {
            data.length > 0 && (
              <WindowScroller>
                {infiniteLoader}
              </WindowScroller>
            )
          }
        </List>
        {loading && spinner()}
      </div>
    )
  }
}

const DocumentsFeed = styled(UnstyledDocumentsFeed)`
border-radius: 4px;
overflow: auto;
padding: 0 24px;

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.ant-table-body {
  margin: 0 !important;
}
.demo-loading {
  position: absolute;
  top: 100%;
  height: 40px !important;
}
.feed-wrapper {
  position: relative;
}
.ant-spin-spinning {
  width: 100%;
}
`

export {
  DocumentsFeed,
}

// function ResizeableTitle(props) {
//   const {
//     width,
//     adjustsWidth,
//     defaultWidth,
//     onResize,
//     onResizeStop,
//     ...restProps
//   } = props

//   if (adjustsWidth === false) {
//     return <th {...restProps} />
//   }

//   return (
//     <Resizable
//       width={width || defaultWidth}
//       height={0}
//       onResize={onResize}
//       onResizeStop={onResizeStop}
//     >
//       <th {...restProps} />
//     </Resizable>
//   )
// }
