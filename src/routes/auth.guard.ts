const AuthGuard = (_component?: any): boolean => {
  return true;
};

export const Auth = Symbol("登陆");

export default AuthGuard;
