import React from 'react'
import classnames from 'classnames'
import styled from 'react-emotion'
import {
  fromJS,
} from 'immutable'
import {
  Input,
  Form,
  Button,
  Icon,
} from 'antd'
import {
  Subscribe,
} from 'unstated'
import {
  DocumentsContainer,
  Local,
  Routes,
} from 'js/container'
const {
  Item: FormItem,
} = Form

const Document = new DocumentsContainer({
  data: fromJS({}),
})
const formItemLayout = {
  labelCol: {
    xs: { span: 24, },
    sm: { span: 6, },
  },
  wrapperCol: {
    xs: { span: 24, },
    sm: { span: 18, },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
}
const StyledNewDocument = styled(UnstyledNewDocument)`
.ant-btn {
  margin-right: 8px;
}
.ant-form-item {
  margin-top: 24px;
  margin-bottom: 0;
}
`
const NewDocument = Form.create()(StyledNewDocument)

export {
  NewDocument,
}

function UnstyledNewDocument({
  form,
  className,
  onCancel,
}) {
  const {
    getFieldDecorator,
  } = form
  const namePath = ['newdocument', 'name']
  return (
    <Subscribe to={[Local, Document]}>
      {(local, doc) => {
        const {
          state,
        } = doc
        const {
          loading,
          saved,
        } = state
        const url = `/app/document/${doc.getIn('id')}`
        return (
          <Form
            className={classnames('create-new-documents', className)}
            onSubmit={(e) => {
              e.preventDefault()
              return form.validateFieldsAndScroll((err, values) => {
                if (err) {
                  return
                }
                doc.setState(() => ({
                  loading: true,
                }))
                doc.create(values).then((data) => {
                  Local.save(namePath, null)
                  return doc.setState(() => ({
                    loading: false,
                    saved: true,
                    data: fromJS(data),
                  }))
                })
              })
            }}
          >
            <h2>
              Create New Document&nbsp;
              {loading
                ? (<Icon type="loading" />)
                : []}
            </h2>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {getFieldDecorator('name', {
                initialValue: local.getIn(namePath),
                rules: [{
                  //   type: 'email',
                  //   message: 'The input is not valid E-mail!',
                  // }, {
                  required: true,
                  message: 'Please input a name for your new Document.',
                }],
              })(
                <Input
                  size="large"
                  onChange={({
                    target,
                  }) => local.save(namePath, target.value)}
                />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button
                size="large"
                type="secondary"
                onClick={saved ? reset : onCancel}
              >
                {saved ? 'Reset' : 'Cancel'}
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                disabled={saved}
              >
                Save
              </Button>
              <Button
                size="large"
                type="secondary"
                disabled={!saved}
                onClick={() => Routes.push(url)}
              >
                Open
              </Button>
            </FormItem>
          </Form>
        )

        function reset() {
          Local.save(namePath, null)
          Document.setState({
            data: fromJS({}),
            saved: false,
          })
        }
      }}
    </Subscribe>
  )
}
