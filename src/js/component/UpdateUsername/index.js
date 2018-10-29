import React, { Component, } from 'react'
import { Input, } from 'antd'
import { User, } from 'js/container'
import styled from 'react-emotion'

const key = 'username'

export class UnstyledUpdateUsername extends Component {
  state = {
    value: '',
  }

  render() {
    const { props, state, } = this
    return (
      <Input
        {...props}
        value={state.value}
        className="space-bottom-2"
        placeholder={User.state.data.get(key)}
        onChange={e => this.setState({ value: sterilize(e.target.value), })}
        onPressEnter={e => User.update({
          [key]: e.target.value,
        }).then(() => this.setState({ value: '', }))
        }
      />
    )
  }
}
export const StyledUpdateUsername = styled(UnstyledUpdateUsername)``

export const UpdateUsername = StyledUpdateUsername

function sterilize(value) {
  return value.replace(/\s/gim, '')
}
