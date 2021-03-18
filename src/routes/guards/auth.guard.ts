import { Guard } from "@/types/guards";

const AuthGuard = (_component?: any) => {
  return new Promise<boolean>((resolve, reject) => reject(false));
};

export const Auth = Symbol("登陆");

const guard: Guard = {
  type: Auth,
  check: AuthGuard,
};

export default guard;
