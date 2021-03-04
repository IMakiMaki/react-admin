import React from "react";

import { NotFound } from "../views/notFound";
const Login = React.lazy(() => import("../views/login"));
const LayoutIndex = React.lazy(() => import("@/layout/index"));

interface Route {
  path: string;
  component: React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>;
  children?: Route[];
  exact?: Boolean;
}

// 路由配置
export const routes: Route[] = [
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/index",
    component: LayoutIndex,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
    exact: true,
  },
];
