import React from "react";
import {Button} from 'antd';

export default function Submit({activeKey, onSubmit}) {
  return (<Button htmlType="submit" onClick={onSubmit}>
    {activeKey === "1"
      ? "Login"
      : activeKey === "2"
      ? "Sign up"
      : "Request Password Reset"}
  </Button>);
}
