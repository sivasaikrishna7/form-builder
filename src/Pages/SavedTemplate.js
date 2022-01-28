import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import './SavedTemplates.css'

const SavedTemplate = (props) => {
  const { template_name, id, label, type } = props
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="stemplate">
      <h1>Google Form</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Name" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Education" name="Education">
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="Address">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SavedTemplate
