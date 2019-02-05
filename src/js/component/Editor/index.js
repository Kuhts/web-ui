import React, {
  memo,
  Fragment,
} from 'react'
import {
  shape,
  string,
} from 'prop-types'
import {
  Collapse,
  Icon,
} from 'antd'
import {
  Subscribe,
} from 'unstated'
import Contents from 'js/component/Editor/contents'
import {
  Local,
  Editor as EditorState,
} from 'js/container'
// import slateSoftBreak from 'slate-soft-break'
// import slateDropOrPasteImages from 'slate-drop-or-paste-images'
// import slatePasteLinkify from 'slate-paste-linkify'
// import slateCollapseOnEscape from 'slate-collapse-on-escape'
// import slateAutoReplace from 'slate-auto-replace'

const {
  Panel,
} = Collapse
const settingsOpenKey = ['editor', 'settings', 'open']
EditorContainer.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }),
}
const EditorView = memo(EditorContainer)

export {
  EditorView as Editor,
}

function EditorContainer({
  match: {
    params: {
      id,
    },
  },
}) {
  const text = 'text here'
  return (
    <Subscribe to={[EditorState]}>
      {(editor) => (
        editor.loading(id)
          ? <Icon type="loading" />
          : (
            <Fragment>
              <Collapse
                bordered={false}
                defaultActiveKey={Local.getIn(settingsOpenKey)}
                onChange={([open]) => Local.save(settingsOpenKey, open)}
              >
                <Panel header={<span>{editor.getIn('name')}</span>} key="1">
                  {text}
                </Panel>
              </Collapse>
              <Contents />
            </Fragment>
          )
      )}
    </Subscribe>
  )
}
