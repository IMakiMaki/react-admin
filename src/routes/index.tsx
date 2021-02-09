import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Loading } from "../components/Loading";
import { NotFound } from "../views/notFound";

const Login = React.lazy(() => import("../views/login"));

const Routes: React.FC = (props) => {
  return (
    <HashRouter>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/index"></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default Routes;
