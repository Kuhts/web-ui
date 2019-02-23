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
  SingleWorkout,
  Local,
  // Routes,
} from 'js/container'
import {
  contentPadding,
} from 'js/styles'
// import {
//   workouts,
// } from 'js/service'
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
      <Subscribe to={[Local, SingleWorkout]}>
        {(local, doc) => {
          const basePath = ['newworkout']
          // const { id, } = match.params
          // const {
          //   state,
          // } = doc
          // const {
          //   saved,
          // } = state
          // const id = doc.getIn('id')
          // const url = workouts.urls.view(id)
          // console.log('rerendering form')
          const onSubmit = (e) => {
            // console.log(e)
            e.preventDefault()
            return form.validateFieldsAndScroll((err, values) => {
              // console.log(err, values)
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
          }
          return (
            <Form
              className={classnames('create-new-workouts', className)}
              onSubmit={onSubmit}>
              <InputIterator
                form={form}
                local={local}
                formItemLayout={formItemLayout}
                label="Name"
                localKey="name"
                basePath={basePath}
                Input={Input}
                onBlur={onSubmit}
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
                onBlur={onSubmit}
                inputProps={{ autosize: { minRows: 4, }, }}
                rules={[{
                  required: true,
                  message: 'Please input description for your new workout.',
                }]}
              />
              <ArrangementSection />
              <FormItem {...tailFormItemLayout}>

                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                Done
                </Button>
              </FormItem>
            </Form>
          )

          // function reset() {
          //   SingleWorkout.reset()
          // }
        }}
      </Subscribe>
    </ContentContainer>
  )
}
/*

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
*/
function ArrangementSection() {
  const { labelCol, wrapperCol, } = formItemLayout
  return (
    <Row className="arrangement-section">
      <Col {...labelCol}>
        <h2>Movements</h2>
        <List />
      </Col>
      <Col {...wrapperCol}>
        <h2>Arrangement</h2>
        <Arrange />
      </Col>
    </Row>
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
  onBlur,
}) {
  const {
    getFieldDecorator,
  } = form
  const path = basePath.concat(localKey)
  const initialValue = local.getIn(path)
  const onChange = ({ target, }) => local.save(path, target.value)
  // const onBlur = () => {}
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
          onBlur={onBlur}
          {...inputProps}
        />
      )}
    </FormItem>
  )
}
