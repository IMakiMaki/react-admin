import React from "react";

import { Route } from "@/types/guards";
import { NotFound } from "../views/notFound";
import { Auth } from "./guards/auth.guard";
const Login = React.lazy(() => import("../views/login"));
const LayoutIndex = React.lazy(() => import("@/layout/index"));

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
    guards: [],
  },
  {
    path: "*",
    component: NotFound,
    exact: true,
  },
];
