import React, {
  Component,
  Fragment,
} from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import classnames from 'classnames'
import {
  Editor as EditorState,
} from 'js/container'
import {
  Editor,
  findDOMNode,
} from 'slate-react'
import {
  Subscribe,
} from 'unstated'
// import {
//   Icon,
// } from 'antd'
import Icon from 'react-icons-kit'
import {
  arrows_circle_plus as arrowsCirclePlus,
} from 'react-icons-kit/linea/arrows_circle_plus'
import HoverMenu from './hover-menu'

const plugins = [
]

Options.propTypes = {
  editor: PropTypes.any,
}

function Options({
  editor,
}) {
  const { value, } = editor
  const { selection, } = value
  const { start, isFocused, } = selection
  const { key, } = start
  let node
  try {
    node = findDOMNode(key) // eslint-disable-line
  } catch (e) {
    console.log(e) // eslint-disable-line
  }
  console.log(key, isFocused, editor, node) // eslint-disable-line
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
    }}>
      <Icon size={32} icon={arrowsCirclePlus} />
    </div>
  )
}

class Contents extends Component {
  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  renderNode = (props, editor, next) => {
    const { node, attributes, children, } = props
    switch (node.type) {
      case 'code':
        return (
          <pre {...attributes}>
            <code>{children}</code>
          </pre>
        )
      case 'headline':
        return (
          <h3 {...attributes}>{children}</h3>
        )
      case 'subheadline':
        return (
          <h4 {...attributes}>{children}</h4>
        )
      case 'paragraph':
        return (
          <p {...attributes} className={node.data.get('className')}>
            {children}
          </p>
        )
      case 'blockquote': {
        return <blockquote {...attributes}>{children}</blockquote>
      }
      default: {
        return next(children)
      }
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes, } = props
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      case 'strikethrough':
        return <s {...attributes}>{children}</s>
      default:
        return next()
    }
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    const { focusedOnEmpty, } = EditorState.state
    return (
      <Fragment>
        {children}
        {focusedOnEmpty ? <Options editor={editor} /> : []}
        <HoverMenu innerRef={(menu) => (this.menu = menu)} editor={editor} />
      </Fragment>
    )
  }

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value, } = EditorState.state
    const { fragment, selection, } = value
    const { isBlurred, isCollapsed, } = selection

    if (isBlurred || isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left
      + window.pageXOffset
      - menu.offsetWidth / 2
      + rect.width / 2}px`
  }

  onKeyDown = (event, editor, next) => {
    if (!event.metaKey) {
      return next()
    }
    switch (event.key) {
      case 's': {
        EditorState.save()
        break
      }
      case '\'': {
        const inblock = this.blockMatches(editor, 'blockquote')
        editor.setBlocks(inblock ? 'paragraph' : 'blockquote')
        break
      }
      case 'b': {
        editor.toggleMark('bold')
        break
      }
      case 'i': {
        editor.toggleMark('italic')
        break
      }
      case 'u': {
        editor.toggleMark('underlined')
        break
      }
      default: {
        return next()
      }
    }
    event.preventDefault()
    return true
  }

  blockMatches(editor, type) {
    const { value, } = editor
    const { marks, blocks, } = value
    return [
      marks,
      blocks
    ].some((blocks) => blocks.some((block) => block.type === type))
  }

  onChange = (changes) => {
    const { value, } = changes
    const { selection, } = value
    const anchor = selection.get('anchor')
    const anchorOffset = anchor.get('offset')
    const anchorPath = anchor.get('path')
    // const anchorX = anchorPath.get(0)
    const anchorY = anchorPath.get(1)
    const focus = selection.get('focus')
    const focusOffset = focus.get('offset')
    const focusPath = focus.get('path')
    // const focusX = focusPath.get(0)
    const focusY = focusPath.get(1)
    const focusedOnEmpty = !anchorOffset && !anchorY && !focusOffset && !focusY
    EditorState.setContents({
      value,
      focusedOnEmpty,
    })
  }

  render() {
    const { props, } = this
    const { className, } = props
    return (
      <Subscribe to={[EditorState]}>
        {(editor) => (
          <div className={classnames('document-wrapper', className)}>
            <Editor
              plugins={plugins}
              value={editor.state.value}
              spellCheck
              renderEditor={this.renderEditor}
              renderMark={this.renderMark}
              renderNode={this.renderNode}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}>
            </Editor>
          </div>
        )}
      </Subscribe>
    )
  }
}

const StyledContents = styled(Contents)`
padding: 40px 0;
height: 100%;
max-width: 740px;
margin: auto;
padding: 20px 40px;
font-size: 21px;
position: relative;
[data-slate-editor] {
  min-height: 100%;
  > * + p {
    margin-top: 1em;
    font-family: medium-content-sans-serif-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  }
}
blockquote {
  margin: 55px 0;
  padding-left: 50px;
  font-size: 30px;
  font-family: Georgia,Cambria,"Times New Roman",Times,serif;
  font-weight: 400;
  font-style: italic;
}
h3 {
  font-size: 1.5em;
}
h4 {
  font-size: 1.2em;
}
`

export default StyledContents

// Contents.propTypes = {
//   // editor: PropTypes.any,
// }
