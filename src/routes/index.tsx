import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { Route as RouteInterface } from "@/types/guards";
import { Loading } from "@/components/Loading";
import { GuardsWrapper } from "./guards";

const TestC = React.lazy(() => {
  return Math.random() > 0.5
    ? import("@/layout/index")
    : Promise.resolve({ default: () => <div>123</div> });
});
interface Props {
  routesConfig: RouteInterface[];
}

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
              render={() => {
                if (typeof config.guards !== "undefined") {
                  const Component = GuardsWrapper({ ...config, guards: config.guards });
                  return <Component />;
                } else {
                  return <config.component />;
                }
              }}
            ></Route>
          ))}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default Routes;
