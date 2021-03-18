import React, { FC, LazyExoticComponent, useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { requireModule, Route as RouteInterface } from "@/types/guards";
import { Loading } from "@/components/Loading";
const GuardsContext = (require as any).context("./", false, /\.guard\.ts$/);
const Guards: requireModule[] = GuardsContext.keys().map(GuardsContext);

const TestC = React.lazy(() => {
  return Math.random() > 0.5
    ? import("@/layout/index")
    : Promise.resolve({ default: () => <div>123</div> });
});
interface Props {
  routesConfig: RouteInterface[];
}

const GuardsWrapper = (config: RouteInterface) => {
  if (!config.guards) {
    // 如果不需要权限 直接返回component
    return <config.component />;
  } else {
    // // 提取当前路由需要的guard并检测
    // config.guards
    //   .map((auth) =>
    //     Guards.find((guard) => {
    //       return guard.default.type === auth;
    //     })
    //   )
    //   .map((guard) => guard?.default.check(config));
    // return React.lazy(() => {
    //   return import("@/layout/index");
    // });
    console.log(
      React.lazy(() => {
        return import("@/layout/index");
      })
    );
    return React.lazy(() => {
      return import("@/layout/index");
    });
  }
};

const Routes: React.FC<Props> = (props) => {
  const [routes, setRoutes] = useState(props.routesConfig);
  useEffect(() => {
    setRoutes(props.routesConfig.filter((item) => item.hidden !== true));
  }, [props.routesConfig]);

  return (
    <HashRouter>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((config, index) => (
            <Route
              key={index}
              path={config.path}
              exact={!!config.exact}
              render={() => (
                <React.Suspense fallback={null}>
                  <TestC />
                </React.Suspense>
              )}
            ></Route>
          ))}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default Routes;
