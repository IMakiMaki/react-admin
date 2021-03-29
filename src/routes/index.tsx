import { Loading } from '@/components/Loading';
import { Route as RouteInterface } from '@/types/route';
import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { GuardsWrapper } from './guards';

interface Props {
  routesConfig: RouteInterface[];
}

const Routes: React.FC<Props> = (props) => {
  const [routes, setRoutes] = useState<RouteInterface[]>([]);
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
                if (typeof config.guards !== 'undefined') {
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
