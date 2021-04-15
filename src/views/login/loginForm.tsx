import { UserService } from '@/api/user';
import { VerifyCode } from '@/components/VerifyCode';
import { useEventEmitter } from '@/hooks/useEventEmitter';
import { useRouter } from '@/hooks/useRouter';
import { storageUtil } from '@/util/storage';
import { CheckCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { useState } from 'react';
import styles from './index.module.scss';

interface LoginParams {
  userName: string;
  passWord: string;
  imgCode: string;
}

const INIT_VALUES: LoginParams = {
  userName: '',
  passWord: '',
  imgCode: '',
};

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm<LoginParams>();
  const [userName, setUserName] = useState(INIT_VALUES.userName);
  const router = useRouter();

  const onFinish = (values: LoginParams) => {
    UserService.login({
      ...values,
      accountType: '0',
    })
      .then((res) => {
        storageUtil.setToken(res.data.token);
        router.push('/index');
      })
      .catch(() => {
        verifyCode$.emit('reload VerifyCode');
        form.setFieldsValue({ imgCode: '' });
      });
  };

  const verifyCode$ = useEventEmitter<string>();

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginParams>) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: any, values: LoginParams) => {
    setUserName(values.userName);
  };

  return (
    <div className={`${styles.loginForm} ${styles.formItem}`}>
      <div className={styles.title}>欢迎登录投放管理平台</div>
      <Form
        form={form}
        name="basic"
        initialValues={INIT_VALUES}
        onFinish={(values) => onFinish(values)}
        onFinishFailed={(errorInfo) => onFinishFailed(errorInfo)}
        requiredMark={false}
        onValuesChange={(changedValues, values) => onValuesChange(changedValues, values)}
      >
        <Form.Item
          className={styles.noErrBorder}
          name="userName"
          rules={[{ required: true, message: '请输入手机号或邮箱' }]}
        >
          <Input placeholder="请输入手机号或邮箱" bordered={false} prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          className={styles.noErrBorder}
          name="passWord"
          rules={[{ required: true, message: '请输入密码' }]}
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
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Form.Item name="imgCode" noStyle>
            <Input
              style={{ width: 200 }}
              placeholder="请输入验证码"
              prefix={<CheckCircleOutlined />}
              bordered={false}
            />
          </Form.Item>
          <div className={styles.verifyCodeWrapper}>
            <VerifyCode eventEmitter={verifyCode$} userName={userName} />
          </div>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
