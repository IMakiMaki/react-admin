import { Route, RouteComponent, RouteGuard } from "@/types/route";
import { doesUserHaveJWT } from "@/util/permissions";
import { Singleton } from "@/util/singleton";
import { useState } from "react";

const AuthGuardComponent = () => {
  const [state, setState] = useState("没有权限啊");
  return <div onClick={() => setState("没有权限????")}>{state}</div>;
};

class AuthGuard extends Singleton implements RouteGuard {
  type = Symbol("登陆");
  check(route: Route) {
    return new Promise<RouteComponent>((resolve) => {
      if (Math.random() > 0.5) {
        resolve(route.component);
      } else {
        resolve(AuthGuardComponent);
      }
    });
  }
}

export default AuthGuard.getSingletonInstance<AuthGuard>();
