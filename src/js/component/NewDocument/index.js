import React from 'react'
import classnames from 'classnames'
import styled from 'react-emotion'
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
} from 'js/container'
const {
  Item: FormItem,
} = Form

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
}) {
  const {
    getFieldDecorator,
  } = form
  const Document = new DocumentsContainer({
    //
  })
  return (
    <Subscribe to={[Local, Document]}>
      {(local, doc) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            return form.validateFieldsAndScroll((err, values) => {
              if (err) {
                return console.error(err) // eslint-disable-line
              }
              doc.setState(() => ({
                loading: true,
              }))
              return doc.create(values).then(() => doc.setState(() => ({
                loading: false,
              })))
            })
          }}
          className={classnames('create-new-documents', className)}
        >
          <h2>
            Create New Document&nbsp;
            {doc.state.loading
              ? (<Icon type="loading" />)
              : []}
          </h2>
          <FormItem
            {...formItemLayout}
            label="Name"
          >
            {getFieldDecorator('name', {
              rules: [{
                //   type: 'email',
                //   message: 'The input is not valid E-mail!',
                // }, {
                required: true,
                message: 'Please input a name for your new Document.',
              }],
            })(
              <Input size="large" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              size="large"
              type="secondary"
            >
            Cancel
            </Button>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
            >
Save
            </Button>
          </FormItem>
        </Form>
      )}
    </Subscribe>
  )
}
