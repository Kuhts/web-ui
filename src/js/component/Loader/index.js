import React, {
  Component,
} from 'react'
const defaultLoading = (
  <div>Loading...</div>
)
export class Loader extends Component {
  state = {
    loaded: false,
  }

  load() {
    const { props, } = this
    const { promise, } = props
    return promise.then ? promise : promise()
  }

  componentDidMount() {
    const loaded = () => this.setState({
      loaded: true,
    })
    this.load().then(loaded, loaded)
  }

  render() {
    const {
      props,
      state,
    } = this
    const {
      loaded,
    } = state
    const {
      children,
      loading = defaultLoading,
    } = props
    return loaded ? children : loading
  }
}
