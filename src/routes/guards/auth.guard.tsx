import { CheckPromiseBack, Route, RouteComponent, RouteGuard } from "@/types/route";
import { doesUserHaveJWT } from "@/util/permissions";
import { Singleton } from "@/util/singleton";
import { useState } from "react";

const AuthGuardComponent = () => {
  const [state, setState] = useState("没有权限啊");
  return (
    <div
      onClick={() =>
        setState((prev) => {
          return prev + "oo";
        })
      }
    >
      {state}
    </div>
  );
};

class AuthGuard extends Singleton implements RouteGuard {
  stayBack = AuthGuardComponent;
  type = Symbol("LOGIN");
  check(route: Route) {
    return new Promise<CheckPromiseBack>((resolve) => {
      if (Math.random() > 0.5) {
        resolve({ pass: true });
      } else {
        resolve({ pass: false, stayBack: this.stayBack });
      }
    });
  }
}

export default AuthGuard.getSingletonInstance<AuthGuard>();
