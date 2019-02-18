import React, {
  Fragment,
} from 'react'
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
  SingleDocument,
  Local,
  Routes,
} from 'js/container'
import {
  contentPadding,
} from 'js/styles'
import {
  documents,
} from 'js/service'
import {
  View as Arrange,
} from './arrange'
import {
  View as List,
} from './list'
const { Item: FormItem, } = Form

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
  match,
  form,
  className,
  onCancel,
}) {
  return (
    <ContentContainer>
      <Subscribe to={[Local, SingleDocument]}>
        {(local, doc) => {
          const basePath = ['newworkout']
          const { id, } = match.params
          const {
            state,
          } = doc
          const {
            saved,
          } = state
          // const id = doc.getIn('id')
          const url = documents.urls.view(id)
          return (
            <Form
              className={classnames('create-new-documents', className)}
              onSubmit={(e) => {
                e.preventDefault()
                return form.validateFieldsAndScroll((err, values) => {
                  if (err) {
                    return
                  }
                  doc.setState({
                    loading: true,
                  })
                  doc.update(values).then((data) => doc.setState(() => ({
                    loading: false,
                    saved: true,
                    data: fromJS(data),
                  })))
                })
              }}>
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
                inputProps={{ autosize: { minRows: 4, }, }}
                rules={[{
                  required: true,
                  message: 'Please input description for your new workout.',
                }]}
              />
              <Row className="arrangement-section">
                <ArrangementSection />
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
            SingleDocument.reset()
          }
        }}
      </Subscribe>
    </ContentContainer>
  )
}

function ArrangementSection() {
  const { labelCol, wrapperCol, } = formItemLayout
  return (
    <Fragment>
      <Col {...labelCol}>
        <h2>Movements</h2>
        <List />
      </Col>
      <Col {...wrapperCol}>
        <h2>Arrangement</h2>
        <Arrange />
      </Col>
    </Fragment>
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
  inputProps,
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
          {...inputProps}
        />
      )}
    </FormItem>
  )
}
