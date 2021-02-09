import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import instance from "../../api/base";
import { Action } from "../../reducer/reducer-action-types";
import styles from "./index.module.scss";

interface FormDataType {
  username: string;
  password: string;
}

const initialFormData: FormDataType = {
  username: "",
  password: "",
};

enum ActionTypes {
  UserNameChange = "USERNAME_CHANGE",
  RememberChange = "REMEMBER_CHANGE",
  PasswordChange = "PASSWORD_CHANGE",
}

interface LoginPayload {
  [ActionTypes.UserNameChange]: string;
  [ActionTypes.PasswordChange]: string;
}

const reducer = (state: FormDataType, action: Action<LoginPayload>): FormDataType => {
  switch (action.type) {
    case ActionTypes.UserNameChange:
      return {
        ...state,
        username: action.payload,
      };
    case ActionTypes.PasswordChange:
      return {
        ...state,
        password: action.payload,
      };
  }
};

const Login: React.FC = () => {
  const onFinish = (values: FormDataType) => {
    instance({ url: "", method: "GET" }).then((res) => {
      console.log(res);
    });
    console.log("Received values of form: ", values);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.container}>
        <Form
          name="normal_login"
          initialValues={initialFormData}
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
