import React from "react";
import { Input, Form } from "antd";

export default function ConfirmPwd({ setModel }) {
  return (
    <Form.Item
      label="Confirm Password"
      name="confirm-password"
      rules={[
        {
          required: true,
          message: "Please comfirm your password.",
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue("password") == value)
              return Promise.resolve();

            return Promise.reject("Passwords must match!");
          },
        }),
      ]}
    >
      <Input type="password" onChange={setModel("repeatedPass")} />
    </Form.Item>
  );
}
