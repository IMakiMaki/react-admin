import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Loading } from "../components/Loading";
import { routes as routesConfig } from "./routesConfig";

const routeWrapper = () => {};

const Routes: React.FC = (props) => {
  return (
    <HashRouter>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          {routesConfig.map((config, index) => (
            <Route
              key={index}
              path={config.path}
              exact={!!config.exact}
              render={() => <div>{<config.component />}</div>}
            ></Route>
          ))}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default Routes;
