import React from 'react'
import { Form, Input } from 'antd'
import './Options.css'

const Options = (props) => {
  if (props.type === 'text') {
    return (
      <div>
        <Form.Item label={props.label} name={props.type}>
          <Input />
        </Form.Item>
      </div>
    )
  }
  if (props.type === 'int') {
    return (
      <div>
        <Form.Item label={props.label} name={props.type}>
          <Input />
        </Form.Item>
      </div>
    )
  }
  return <div></div>
}

export default Options
