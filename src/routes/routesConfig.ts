import { Route } from "@/types/route";
import React from "react";
import { NotFound } from "../views/notFound";
import AuthGuard from "./guards/auth.guard";

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
    guards: [AuthGuard.type],
  },
  {
    path: "*",
    component: NotFound,
    exact: true,
  },
];
