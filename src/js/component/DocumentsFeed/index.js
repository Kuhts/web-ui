import React, {
  Component,
} from 'react'
import {
  NavLink,
} from 'react-router-dom'
import styled from 'react-emotion'
import {
  Table,
  Input,
  Button,
  Icon,
} from 'antd'
import {
  Documents,
  Local,
} from 'js/container'
import {
  Subscribe,
} from 'unstated'
import {
  Resizable,
} from 'react-resizable'
import 'react-resizable/css/styles.css'

const groupKey = [
  'documentsFeed'
]
const sizesKey = groupKey.concat(['sizes'])

class UnstyledDocumentsFeed extends Component {
  state = {
    dataSource: [],
    loading: false,
    pagination: {},
    searchText: '',
    columns: [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // width: 250,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={(ele) => { this.searchInput = ele }}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: (filtered) => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa', }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus()
          })
        }
      },
      render: (text, row, index) => {
        const {
          searchText,
        } = this.state
        const url = `/app/document/${row.pathname}`
        return (
          <NavLink to={url}>
            {searchText ? (
              <span>
                {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
                  fragment.toLowerCase() === searchText.toLowerCase()
                    ? <span key={`${text}-${i}`} className="highlight">{fragment}</span>
                    : fragment))}
              </span>
            ) : text}
          </NavLink>
        )
      },
    }, {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      // width: 250,
    }, {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'createdAt',
      // width: 250,
    }, {
      title: 'Last Modified',
      dataIndex: 'updated_at',
      key: 'modifiedAt',
      adjustsWidth: false,
      // width: 200,
      // filters: [{
      //   text: 'London',
      //   value: 'London',
      // }, {
      //   text: 'New York',
      //   value: 'New York',
      // }],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    }],
  }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  onResizeStop = async () => {
    await Local.save(sizesKey, this.sizes())
  }

  handleSearch = (selectedKeys, confirm) => () => {
    confirm()
    this.setState(() => ({
      searchText: selectedKeys[0],
    }))
  }

  handleReset = (clearFilters) => () => {
    clearFilters()
    this.setState(() => ({
      searchText: '',
    }))
  }

  handleTableChange = (pager, filters, sorter) => {
    this.setState(({
      pagination,
    }) => ({
      pagination: {
        ...pagination,
        current: pager.current,
      },
    }))
    return this.fetch({
      results: pager.pageSize,
      page: pager.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    })
  }

  fetch = (params = {}) => {
    this.setState({
      loading: true,
    })
    return Documents.access(params).then((data) => this.setState(({
      pagination,
    }) => ({
      loading: false,
      pagination,
      dataSource: Documents.records(),
    })),
    () => this.setState(() => ({
      loading: false,
    })))
  }

  handleResize = (index) => (e, {
    size: {
      width,
    },
  }) => this.setState(({
    columns,
  }) => {
    const nextColumns = [...columns]
    nextColumns[index] = {
      ...nextColumns[index],
      width,
    }
    return {
      columns: nextColumns,
    }
  })

  sizes() {
    return this.state.columns.reduce((memo, {
      width,
      key,
    }) => {
      if (width) {
        memo[key] = width
      } else {
        memo[key] = Local.getIn(sizesKey.concat(key) || null)
      }
      return memo
    }, {})
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const {
      state,
      props,
      handleTableChange,
    } = this
    const {
      className,
    } = props
    const {
      dataSource,
      loading,
      pagination,
    } = state
    return (
      <Subscribe to={[Documents, Local]}>
        {(documents, local) => {
          const sizes = local.getIn(sizesKey) || new Map()
          const columns = state.columns.map((col, index) => ({
            ...col,
            width: col.width || sizes.get(col.key),
            onHeaderCell: ({
              width,
              key,
              adjustsWidth,
            }) => ({
              key,
              adjustsWidth,
              defaultWidth: 200,
              width: width || sizes.get(key),
              onResize: this.handleResize(index),
              onResizeStop: this.onResizeStop,
            }),
          }))
          return (
            <Table
              bordered
              size="small"
              className={className}
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={dataSource}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
              components={this.components}
            />
          )
        }}
      </Subscribe>
    )
  }
}

const DocumentsFeed = styled(UnstyledDocumentsFeed)`
.ant-table-body {
  margin: 0 !important;
}
`

export {
  DocumentsFeed,
}

function ResizeableTitle(props) {
  const {
    width,
    adjustsWidth,
    defaultWidth,
    onResize,
    onResizeStop,
    ...restProps
  } = props

  if (adjustsWidth === false) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width || defaultWidth}
      height={0}
      onResize={onResize}
      onResizeStop={onResizeStop}
    >
      <th {...restProps} />
    </Resizable>
  )
}
