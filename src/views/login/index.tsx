import CopyRight from "@/components/CopyRight";
import Logo from "@/components/Logo";
import React from "react";
import styles from "./index.module.scss";
import LoginForm from "./loginForm";

interface FormDataType {
  username: string;
  password: string;
}

const initialFormData: FormDataType = {
  username: "",
  password: "",
};

// enum ActionTypes {
//   UserNameChange = "USERNAME_CHANGE",
//   RememberChange = "REMEMBER_CHANGE",
//   PasswordChange = "PASSWORD_CHANGE",
// }

// interface LoginPayload {
//   [ActionTypes.UserNameChange]: string;
//   [ActionTypes.PasswordChange]: string;
// }

// const reducer = (state: FormDataType, action: Action<LoginPayload>): FormDataType => {
//   switch (action.type) {
//     case ActionTypes.UserNameChange:
//       return {
//         ...state,
//         username: action.payload,
//       };
//     case ActionTypes.PasswordChange:
//       return {
//         ...state,
//         password: action.payload,
//       };
//   }
// };

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
