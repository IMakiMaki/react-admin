import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Loading } from "../components/Loading";
import { Route as RouteInterface } from "./routesConfig";

const GuardsContext = (require as any).context("./", false, /\.guard\.ts$/);
const Guards: { default: () => boolean }[] = GuardsContext.keys().map(GuardsContext);

interface Props {
  routesConfig: RouteInterface[];
}

const GuardsWrapper: React.FC<{ config: RouteInterface }> = ({ config }) => {
  if (!config.guards) {
    // 如果不需要权限 直接返回component
    return <config.component />;
  } else {
    // 提取需要的guard
    return null;
  }
};

const Routes: React.FC<Props> = (props) => {
  const [routes, setRoutes] = useState(props.routesConfig);
  console.log(GuardsContext.keys());

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
              render={() => <GuardsWrapper config={config} />}
            ></Route>
          ))}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default Routes;
