import { Container, } from 'unstated'
import { toPath, } from 'lodash'
import { fromJS, } from 'immutable'

export class ImmutableContainer extends Container {
  constructor(props) {
    super(props)
    const data = fromJS(props)
    this.state = {
      data,
    }
  }

  getIn(path) {
    return this.state.data.getIn(toPath(path))
  }

  setIn(path, value, state) {
    return this.setState(({ data, }) => ({
      data: data.setIn(toPath(path), value),
      ...state,
    }))
  }

  merge(data, state) {
    return this.setState(({ data, }) => ({
      data: data.merge(data),
      ...state,
    }))
  }
}
