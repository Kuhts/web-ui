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
  Col,
  Row,
} from 'antd'
import {
  Subscribe,
} from 'unstated'
import {
  ContentContainer,
} from 'js/component'
import {
  DocumentsContainer,
  Local,
  Routes,
} from 'js/container'
import {
  contentPadding,
} from 'js/styles'
import {
  View as Arrange,
} from './arrange'
import {
  View as List,
} from './list'
const { Item: FormItem, } = Form

const Document = new DocumentsContainer({
  data: fromJS({}),
})
const formItemLayout = {
  labelCol: {
    className: 'column',
    xs: { span: 24, },
    sm: { span: 8, },
  },
  wrapperCol: {
    className: 'column',
    xs: { span: 24, },
    sm: { span: 16, },
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
const StyledNewWorkout = styled(UnstyledNewWorkout)`
.ant-btn {
  margin-right: 8px;
}
.ant-form-item {
  margin-top: 24px;
  margin-bottom: 0;
}
.arrangement-section {
  margin-top: ${contentPadding}px;
}
.column {
  padding: ${contentPadding / 2}px;
}
`
const NewWorkout = Form.create()(StyledNewWorkout)

export {
  NewWorkout,
}

function UnstyledNewWorkout({
  form,
  className,
  onCancel,
}) {
  const basePath = ['newworkout']
  return (
    <ContentContainer>
      <Subscribe to={[Local, Document]}>
        {(local, doc) => {
          const {
            state,
          } = doc
          const {
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
                  doc.create(values).then((data) => doc.setState(() => ({
                    loading: false,
                    saved: true,
                    data: fromJS(data),
                  })))
                })
              }}
            >
              <InputIterator
                form={form}
                local={local}
                formItemLayout={formItemLayout}
                label="Name"
                localKey="name"
                basePath={basePath}
                Input={Input}
                rules={[{
                  required: true,
                  message: 'Please input a name for your new workout.',
                }]}
              />
              <InputIterator
                form={form}
                local={local}
                formItemLayout={formItemLayout}
                label="Description"
                localKey="description"
                basePath={basePath}
                Input={Input.TextArea}
                rules={[{
                  required: true,
                  message: 'Please input description for your new workout.',
                }]}
              />
              <Row className="arrangement-section">
                <Col {...formItemLayout.labelCol}>
                  <h2>Movements</h2>
                  <List />
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <h2>Arrangement</h2>
                  <Arrange />
                </Col>
              </Row>
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
            Document.setState({
              data: fromJS({}),
              saved: false,
            })
          }
        }}
      </Subscribe>
    </ContentContainer>
  )
}

function InputIterator({
  form,
  local,
  formItemLayout,
  rules,
  basePath,
  localKey,
  Input,
  label,
}) {
  const {
    getFieldDecorator,
  } = form
  const path = basePath.concat(localKey)
  const initialValue = local.getIn(path)
  const onChange = ({ target, }) => local.save(path, target.value)
  return (
    <FormItem
      {...formItemLayout}
      label={label}
    >
      {getFieldDecorator(localKey, {
        initialValue,
        rules,
      })(
        <Input
          size="large"
          onChange={onChange}
        />
      )}
    </FormItem>
  )
}
