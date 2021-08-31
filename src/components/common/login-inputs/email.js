import React from "react";
import { Input, Form } from "antd";

export default function Email({ setModel }) {
  return (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          type: "email",
          message: "Please provide a valid email",
        },
        {
          required: true,
          message: "Email is required",
        },
      ]}
    >
      <Input type="email" onChange={setModel("email")} />
    </Form.Item>
  );
}
