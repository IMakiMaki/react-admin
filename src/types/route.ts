import React from "react";

export type RouteComponent = React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>;

// 路由类型
export interface Route {
  readonly guards?: Symbol[];
  readonly hidden?: Boolean;
  readonly path: string;
  readonly component: RouteComponent;
  readonly children?: Route[];
  readonly exact?: Boolean;
}

// 路由守卫类型
export interface RouteGuard {
  type: Symbol;
  check: (route: Route) => Promise<RouteComponent>;
}
