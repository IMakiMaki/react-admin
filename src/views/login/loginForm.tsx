import UserService from "@/api/user";
import { CheckCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const VerifyCode: React.FC = () => {
  const [img, setImg] = useState("");
  useEffect(() => {
    UserService.getVerifyCodeImg({ userName: "21312", t: 123132 }).then((res) => {
      setImg(
        `data:image/png;base64,${btoa(
          new Uint8Array(res as any).reduce((data, byte) => data + String.fromCharCode(byte), "")
        )}`
      );
    });
  }, []);
  return (
    <div className={styles.verifyCode}>
      <img src={img} alt="" />
    </div>
  );
};

function LoginForm() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={`${styles.loginForm} ${styles.formItem}`}>
      <div className={styles.title} style={{ marginBottom: "36px" }}>
        欢迎登录投放管理平台
      </div>
      <Form
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
      >
        <Form.Item
          className={styles.noErrBorder}
          name="username"
          rules={[{ required: true, message: "请输入手机号或邮箱" }]}
        >
          <Input placeholder="请输入手机号或邮箱" bordered={false} prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          className={styles.noErrBorder}
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password
            placeholder="请输入密码"
            prefix={<LockOutlined />}
            visibilityToggle={false}
            bordered={false}
          />
        </Form.Item>

        <Form.Item
          className={styles.noErrBorder}
          name="validCode"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Input
            placeholder="请输入验证码"
            suffix={<VerifyCode />}
            prefix={<CheckCircleOutlined />}
            bordered={false}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "30px" }}>
            <a href="./">免费注册</a>
            <a href="./">忘记密码？</a>
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
