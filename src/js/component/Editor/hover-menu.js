import ReactDOM from 'react-dom'
import React from 'react'
import styled from 'react-emotion'
import {
  any,
  oneOfType,
  array,
  string,
  object,
} from 'prop-types'
import {
  Button,
  Icon,
} from 'antd'
const {
  Group: ButtonGroup,
} = Button

export const StyledButton = styled(({
  active,
  reversed,
  ...props
}) => <Button {...props} />)`
  cursor: pointer;
  padding: 0 10px;
  color: ${(props) => {
    const light = props.active ? 'white' : '#aaa'
    const dark = props.active ? 'black' : '#ccc'
    return props.reversed ? light : dark
  }};
`

export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`

export const StyledMenu = styled(Menu)`
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
`
export const Pipe = styled('div')`
height: 32px;
position: relative;
display: inline-block;
width: 1px;
background: #ccc;
`

/**
 * The hovering menu.
 *
 * @type {Component}
 */

class HoverMenu extends React.Component {
  onToggleBlock = (event, type) => {
    const { editor, } = this.props
    const { value, } = editor
    const { blocks, } = value
    event.preventDefault()
    const isInBlock = blocks.some((block) => block.type === type)
    editor.setBlocks(isInBlock ? 'paragraph' : type)
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    const { editor, } = this.props
    event.preventDefault()
    editor.toggleMark(type)
  }
  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { className, innerRef, } = this.props
    const root = window.document.getElementById('app')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        <ButtonGroup>
          {this.renderMarkButton('bold', 'bold')}
          {this.renderMarkButton('italic', 'italic')}
          {this.renderMarkButton('headline', 'font-size', this.onToggleBlock)}
          {this.renderMarkButton('subheadline', 'font-size', this.onToggleBlock)}
          {this.renderMarkButton('blockquote', 'menu-unfold', this.onToggleBlock)}
        </ButtonGroup>
      </StyledMenu>,
      root
    )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton(type, icon, handler = this.onClickMark) {
    const { editor, } = this.props
    const { value, } = editor
    const { activeMarks, blocks, } = value
    const someActive = activeMarks.some((mark) => mark.type === type)
    const isActive = someActive || blocks.some((block) => block.type === type)
    return (
      <StyledButton
        active={isActive}
        type="secondary"
        onMouseDown={(event) => handler(event, type)}>
        <Icon type={icon} />
      </StyledButton>
    )
  }
}

HoverMenu.propTypes = {
  editor: any,
  innerRef: any,
  className: oneOfType([
    string,
    array,
    object
  ]),
}

export default HoverMenu
