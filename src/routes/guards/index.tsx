import { requireContextModule } from "@/types/common";
import { Guard, Route } from "@/types/guards";
import React from "react";

const GuardsContext = (require as any).context("./", false, /\.guard\.ts$/);
const Guards: requireContextModule<Guard>[] = GuardsContext.keys().map(GuardsContext);

const TestC = React.lazy(() => {
  return Math.random() > 0.5
    ? import("@/layout/index")
    : Promise.resolve({ default: () => <div>123</div> });
});

interface Config extends Route {
  guards: Exclude<Route["guards"], undefined>;
}

export const GuardsWrapper = (config: Config) => {
  if (!config.guards.length) {
    return config.component;
  } else {
    return config.component;
  }
  // if (!config.guards.length) {
  //   return import("@/layout/index");
  // }
  // return React.lazy(async () => {
  //   // 提取当前路由需要的guard并检测
  //   await Promise.all(
  //     config.guards
  //       .map((auth) =>
  //         Guards.find((guard) => {
  //           return guard.default.type === auth;
  //         })
  //       )
  //       .map((guard) => guard?.default.check(config))
  //   );
  //   return import("@/layout/index");
  // });
};
