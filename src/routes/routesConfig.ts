import React from "react";

import { NotFound } from "../views/notFound";
import { Auth } from "./auth.guard";
const Login = React.lazy(() => import("../views/login"));
const LayoutIndex = React.lazy(() => import("@/layout/index"));

export interface Route {
  guards?: Symbol[];
  hidden?: Boolean;
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
    guards: [Auth],
  },
  {
    path: "*",
    component: NotFound,
    exact: true,
  },
];
