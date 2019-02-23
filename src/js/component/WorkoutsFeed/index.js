import React, {
  Component,
} from 'react'
import styled from 'react-emotion'
import {
  List,
  Spin,
} from 'antd'
import {
  contentPadding,
} from 'js/styles'
import classnames from 'classnames'
import reqwest from 'reqwest'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import VList from 'react-virtualized/dist/commonjs/List'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'

const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo'

class UnstyledWorkoutsFeed extends Component {
  state = {
    data: [],
    loading: false,
  }

  loadedRowsMap = {}

  componentDidMount() {
    return this.gatherData()
  }

  gatherData(list = []) {
    return this.fetchData(({
      results,
    }) => this.setState(() => ({
      data: list.concat(results.map((obj) => Object.assign(obj, {
        date: (new Date()).toISOString(),
      }))),
      loading: false,
    })))
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
    return this.gatherData(data)
  }

  isRowLoaded = ({
    index,
  }) => !!this.loadedRowsMap[index]

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
      date,
      summary = 'Bacon ipsum dolor amet leberkas tri-tip ham hock tongue, landjaeger pork beef ribs rump ball tip beef. Pig drumstick shankle, porchetta ball tip meatloaf burgdoggen boudin ham hock bacon pork loin.',
      title = 'title',
    } = item
    const styls = Object.assign({}, style, {
      borderBottom: 0,
    })
    return (
      <List.Item key={key} style={styls}>
        <List.Item.Meta
          title={title}
          description={date}
        />
        <div className="post-content-container">{summary}</div>
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
        rowHeight={65}
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

const WorkoutsFeed = styled(UnstyledWorkoutsFeed)`
border-radius: 4px;
overflow: auto;
padding: 0;
.ant-list-item {
  padding: ${contentPadding / 2}px;
  display: block;
}
.ant-list-item-meta-title {
  float: left;
}
.ant-list-item-meta-description {
  float: right;
  margin-left: 5px;
}
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
.post-content-container {
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
}
`

export {
  WorkoutsFeed,
}
