import { requireContextModule } from "@/types/common";
import { Route, RouteComponent, RouteGuard } from "@/types/route";
import { isReactLazyComponent } from "@/util";
import React from "react";
import authGuard from "./auth.guard";

const GuardsContext = (require as any).context("", false, /\.guard\.tsx?$/);
const Guards: requireContextModule<RouteGuard>[] = GuardsContext.keys().map(GuardsContext);

interface Config extends Route {
  guards: Exclude<Route["guards"], undefined>;
}

export class Wrapper extends React.Component<{ component: RouteComponent }> {
  render() {
    const { component } = this.props;
    // console.log(component?.$$typeof, component instanceof React.LazyExoticComponent);
    return (
      <div style={{ color: "blue" }}>
        {(() => {
          console.log();
          if (isReactLazyComponent(component)) {
            return (
              <React.Suspense fallback={<div>Loading...</div>}>
                <this.props.component />
              </React.Suspense>
            );
          } else {
            return <this.props.component />;
          }
        })()}
      </div>
    );
  }
}

export const GuardsWrapper = (config: Config) => {
  if (!config.guards.length) {
    return config.component;
  } else {
    return React.lazy(async () => {
      // return Math.random() > 0.5
      //   ? import("@/layout/index")
      //   : Promise.resolve({ default: () => <div>123</div> });
      const component = await Guards.find((guard) => {
        return guard.default.type === authGuard.type;
      })
        ?.default.check(config)
        .then((routeComponent) => {
          return <Wrapper component={routeComponent}></Wrapper>;
        });
      return Promise.resolve({ default: () => (component ? component : null) });
    });
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
