import CopyRight from '@/components/CopyRight';
import Logo from '@/components/Logo';
import React from 'react';
import styles from './index.module.scss';
import LoginForm from './loginForm';

const Login: React.FC = () => {
  return (
    <div className={styles.loginWrapper}>
      <Logo></Logo>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.topText}>智能投放引擎，轻松投放在线广告</div>
          <div className={styles.bottomText}>将更多客户收入囊中</div>
        </div>
        <div className={styles.formWrap}>
          <LoginForm />
        </div>
      </div>
      <CopyRight />
    </div>
  );
};

export default Login;
