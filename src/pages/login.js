import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Form } from "antd";
import {
  Email,
  Password,
  ConfirmPwd,
  ForgotPwd,
  Submit,
} from "../components/common/login-inputs";

const { TabPane } = Tabs;

export default function Login() {
  const [activeKey, setActiveKey] = useState("1");

  const [data, setData] = useState({});

  const setModel =
    (key) =>
    ({ target }) => {
      setData({
        ...data,
        [key]: target.value,
      });
    };

  const onSubmit = () => {
    alert("Form Submitted Succesfully!");
  };

  return (
    <div className="signin-container">
      <Form name="basic" initialValues={{ remember: true }} layout="vertical">
        <div className="form-container">
          <Tabs activeKey={activeKey} onChange={setActiveKey}>
            <TabPane tab="Login" key="1">
              <Email setModel={setModel} />
              <Password setModel={setModel} />
              <ForgotPwd setActiveKey={setActiveKey} />
              <Submit activeKey={activeKey} onSubmit={onSubmit} />
            </TabPane>
            <TabPane tab="Signup" key="2">
              <Email setModel={setModel} />
              <Password setModel={setModel} />
              <ConfirmPwd setModel={setModel} />
              <Submit activeKey={activeKey} onSubmit={onSubmit} />
            </TabPane>
          </Tabs>
            {activeKey === '3' && <Email setModel={setModel} />}
            {activeKey === '3' && <Submit activeKey={activeKey} onSubmit={onSubmit} />}
        </div>
      </Form>
    </div>
  );
}
