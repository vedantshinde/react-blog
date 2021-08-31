import React from "react";
import { Input, Tabs, Form } from "antd";

export default function Password({ setModel }) {
  return (
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please enter a password.",
        },
        () => ({
          validator(rule, value) {
            if (value.length > 7) return Promise.resolve();

            return Promise.reject(
              "Password must be at least 8 characters long."
            );
          },
        }),
      ]}
    >
      <Input type="password" onChange={setModel("password")} />
    </Form.Item>
  );
}
